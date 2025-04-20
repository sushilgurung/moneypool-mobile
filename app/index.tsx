import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthContext';

/**
 * Initial router component
 * This component decides where to navigate based on authentication status
 */
export default function InitialRouter() {
  const { isAuthenticated, isLoading, autoLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    autoLogin();
  }, []);

  useEffect(() => {
    // Only redirect after auth state is determined
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/LoginScreen');
      }
    }
  }, [isAuthenticated, isLoading]);

  // Show a loading indicator while determining auth state
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#9f2b68" />
    </View>
  );
}
