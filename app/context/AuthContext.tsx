// context/AuthContext.tsx - Auth context to maintain and check auth state
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { AppDispatch, RootState } from '@/state/store';
import { login, logout } from '@/state/user/userSlice';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';

export type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  handleBiometricAuth: () => Promise<void>;
  isBiometricSupported: boolean;
  bioAuth: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { User, error, status } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  //biometrics
  const [isBiometricSupported, setIsBiometricSupported] =
    useState<boolean>(false);
  const [bioAuth, setBioAuth] = useState<boolean>(false);

  useEffect(() => {
    checkBiometricsCompatibility();
  }, []);

  async function handleBiometricAuth() {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

    if (!savedBiometrics) {
      return alert(
        'Biometric authentication not set up on your device. Please set up biometrics in your device settings.'
      );
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });

    if (biometricAuth.success) {
      setBioAuth(true);
    } else {
      setBioAuth(false);
    }
  }

  async function checkBiometricsCompatibility() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(compatible);
  }

  useEffect(() => {
    // Check for saved credentials on app start
    const checkAuth = async () => {
      try {
        const storedUsername = await SecureStore.getItemAsync('username');
        const storedPassword = await SecureStore.getItemAsync('password');

        if (storedUsername && storedPassword) {
          // Attempt to login with stored credentials
          await dispatch(
            login({
              username: storedUsername,
              password: storedPassword,
            })
          ).unwrap();
        }
      } catch (error) {
        console.log('Auto login failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Handles user login and stores details in SecureStore
   * @param username
   * @param password
   */
  const loginHandler = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await dispatch(login({ username, password })).unwrap();
      if (result.user_id) {
        await SecureStore.setItemAsync('username', username);
        await SecureStore.setItemAsync('password', password);
        router.replace('/(tabs)');
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'error' in error) {
        Alert.alert(
          'Login Failed',
          String((error as { error: unknown }).error)
        );
      } else {
        Alert.alert('Login Failed', 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      setIsLoading(true);

      const result = await dispatch(logout()).unwrap();
      if (result) {
        await SecureStore.deleteItemAsync('username');
        await SecureStore.deleteItemAsync('password');
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'error' in error) {
        Alert.alert(
          'Logout Failed',
          String((error as { error: unknown }).error)
        );
      } else {
        Alert.alert('Logout Failed', 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isLoading,
    isAuthenticated: !!User,
    login: loginHandler,
    logout: logoutHandler,
    error,
    handleBiometricAuth,
    isBiometricSupported,
    bioAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
