import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

/**
 * Home screen component that displays user information and logout option.
 * Requires authentication - redirects to login if user is not authenticated.
 *
 * ```
 * @returns JSX Element representing the Home screen
 */
export function HomeScreen() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  const { User } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  /**
   * Handles authentication redirects to login screen
   */
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/LoginScreen');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <View className="flex-1 p-6 bg-gray-100 justify-center">
      {User ? (
        <View className="flex flex-col items-center mb-2 h-1/3">
          <Text className="text-xl font-semibold text-gray-800">
            {User.username}
          </Text>
          <Text className="text-sm text-gray-500 mb-4">{User.user_id}</Text>
        </View>
      ) : null}

      <Pressable className="bg-blue-600 py-4 rounded-lg " onPress={logout}>
        <Text className="text-white text-center font-semibold">Logout</Text>
      </Pressable>
    </View>
  );
}

export default HomeScreen;
