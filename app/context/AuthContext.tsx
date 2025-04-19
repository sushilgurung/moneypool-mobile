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
  autoLogin: () => Promise<boolean>;
  error: string | null;
  handleBiometricAuth: () => Promise<boolean>;
  isBiometricSupported: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { User, error } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  //biometrics
  const [isBiometricSupported, setIsBiometricSupported] =
    useState<boolean>(false);

  useEffect(() => {
    checkBiometricsCompatibility();
  }, []);

  /**
   *
   * @returns true or false depending on if biometrics worked
   */
  async function handleBiometricAuth(): Promise<boolean> {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

    if (!savedBiometrics) {
      alert(
        'Biometric authentication not set up on your device. Please set up biometrics in your device settings.'
      );
      return false;
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });

    if (biometricAuth.success) {
      return true;
    } else {
      return false;
    }
  }

  /** function to check if device can use biometrics */
  async function checkBiometricsCompatibility() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(compatible);
  }

  /** auto logins in user if there are stored details for when user closes app */

  async function autoLogin(): Promise<boolean> {
    setIsLoading(true);
    try {
      const storedUsername = await SecureStore.getItemAsync('username');
      const storedPassword = await SecureStore.getItemAsync('password');
      console.log('secure ', storedUsername, storedPassword);

      if (!storedUsername || !storedPassword) {
        console.log('No stored credentials.');
        return false;
      }

      const result = await dispatch(
        login({
          username: storedUsername,
          password: storedPassword,
        })
      ).unwrap();

      if (result.user_id) {
        return true;
      } else {
        console.log('Login failed: invalid credentials or backend error.');
        return false;
      }
    } catch (error) {
      console.error('Auto login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

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

  /**
   * Logs out user and removes all stored details
   */

  async function logoutHandler() {
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
  }

  const value = {
    isLoading,
    isAuthenticated: !!User,
    login: loginHandler,
    logout: logoutHandler,
    error,
    handleBiometricAuth,
    isBiometricSupported,
    autoLogin,
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
