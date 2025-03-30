import { View, TextInput, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { RootState, AppDispatch } from '@/state/store';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '@/state/user/userSlice';

export default function LoginScreen() {
  const [username, setUsername] = useState<string>('mountainexplorer42');
  const [password, setPassword] = useState<string>('test');

  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View className="flex-1 p-6 bg-white justify-center">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </Text>

        <Text className="text-gray-600 mb-2">Username</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mb-4 text-gray-800"
          onChangeText={setUsername}
          value={username}
          placeholder="Enter your username"
        />

        <Text className="text-gray-600 mb-2">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mb-6 text-gray-800"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Enter your password"
        />

        <Pressable
          className="bg-blue-500 py-3 rounded-md"
          onPress={() => dispatch(login({ username, password }))}
        >
          <Text className="text-white text-center font-semibold">Log In</Text>
        </Pressable>

        {userState.User?.username && (
          <View className="mt-4 p-3 bg-green-100 rounded-md">
            <Text className="text-green-700 text-center">
              Logged in as: {userState.User.username}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
