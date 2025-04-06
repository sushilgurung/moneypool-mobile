import { View, Pressable, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useAuth } from '@/app/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

/**
 * Account Footer which contains the logout button
 * @returns {JSX.Element}  Account Footer
 */
export default function Footer() {
  const { User } = useSelector((state: RootState) => state.user);
  const { logout } = useAuth();

  return (
    <>
      {User ? (
        <>
          <View className="px-4 mb-8">
            <Pressable
              className="bg-red-100 py-4 rounded-xl border border-red-200 active:bg-red-200"
              onPress={logout}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  className="text-red-600 mr-2"
                />
                <Text className="text-red-600 font-semibold">Logout</Text>
              </View>
            </Pressable>
          </View>
          <Text className="text-xs text-gray-400 text-center mb-8">
            App Version: 1.0.0
          </Text>
        </>
      ) : (
        <View className="flex-1 items-center justify-center py-20">
          <Text className="text-lg text-gray-600 mb-4">
            Please log in to view your account
          </Text>
          <Pressable
            className="bg-blue-600 px-8 py-3 rounded-lg"
            onPress={() => router.push('/LoginScreen')}
          >
            <Text className="text-white font-semibold">Login</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}
