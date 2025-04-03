import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../context/AuthContext';

// ./(tabs)/account.tsx
export default function AccountScreen() {
  const { logout } = useAuth();
  return (
    <View>
      <Text>Account Screen</Text>
      <Pressable className="bg-blue-600 py-4 rounded-lg " onPress={logout}>
        <Text className="text-white text-center font-semibold">
          Logout tabs
        </Text>
      </Pressable>
    </View>
  );
}
