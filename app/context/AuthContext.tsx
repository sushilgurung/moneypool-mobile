// context/AuthContext.tsx - Auth context to maintain and check auth state
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { AppDispatch, RootState } from '@/state/store';
import { login } from '@/state/user/userSlice';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
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

  const loginHandler = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await dispatch(login({ username, password })).unwrap();
      if (result.user_id) {
        console.log('login');
        await SecureStore.setItemAsync('username', username);
        await SecureStore.setItemAsync('password', password);
        router.replace('/HomeScreen');
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
      // Clear stored credentials
      await SecureStore.deleteItemAsync('username');
      await SecureStore.deleteItemAsync('password');

      // Clear user from Redux state
      // You may want to add a logout action to your userSlice
    } catch (error) {
      console.log('Logout failed:', error);
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
