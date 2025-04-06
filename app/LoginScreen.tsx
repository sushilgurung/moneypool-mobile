import { View, TextInput, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { router } from 'expo-router';

/**
 * Component that renders the LoginScreen component for user authentication. Has
 * a username and password input with a button to login and another button
 * to switch to registration
 *
 * @returns {JSX.Element} Login Form Screen
 */

export default function LoginScreen() {
  const [username, setUsername] = useState<string>('alex_smith');
  const [password, setPassword] = useState<string>('test');

  const { login } = useAuth();

  return (
    <View className="flex-1 p-6 bg-white justify-center">
      <View className="mb-8">
        <View className="h-2/3 flex flex-col justify-center">
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
        </View>
        <View className=" h-1/4 flex flex-col justify-around">
          <Pressable
            className="bg-blue-500 py-3 rounded-md"
            onPress={() => login(username, password)}
          >
            <Text className="text-white text-center font-semibold">Log In</Text>
          </Pressable>

          <Pressable
            className="bg-blue-500 py-3 rounded-md"
            onPress={() => router.replace('/RegisterScreen')}
          >
            <Text className="text-white text-center font-semibold">
              Switch to Register
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
