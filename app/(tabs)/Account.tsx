import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

// ./(tabs)/account.tsx
export default function AccountScreen() {
  const { User } = useSelector((state: RootState) => state.user);
  const { logout } = useAuth();
  return (
    <View>
      <Text>Account Screen</Text>
      {User ? (
        <View className="flex flex-col items-center mb-2 h-1/3">
          <Text className="text-xl font-semibold text-gray-800">
            {User.username}
          </Text>
          <Text className="text-sm text-gray-500 mb-4">{User.user_id}</Text>
        </View>
      ) : null}
      <Pressable className="bg-blue-600 py-4 rounded-lg " onPress={logout}>
        <Text className="text-white text-center font-semibold">
          Logout tabs
        </Text>
      </Pressable>
    </View>
  );
}
