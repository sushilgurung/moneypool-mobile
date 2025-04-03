import { View } from 'react-native';

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthContext';

/**
 * Index component serving as the application entry point.
 * Handles authentication-based routing logic.
 *
 * This component checks the user's authentication status and redirects to the appropriate screen:
 * - HomeScreen: If the user is authenticated
 * - LoginScreen: If the user is not authenticated
 *
 * @returns {JSX.Element} An empty View component that renders while redirection occurs
 */
export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/LoginScreen');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return <View></View>;
}
