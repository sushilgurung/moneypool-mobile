import { View, TextInput, Text, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { register } from '@/state/user/userSlice';

interface RegisterError {
  error: string;
}

/**
 * Component that renders the RegisterScreen component for user creation. Has
 * a username and password and confirm password input with a button to
 *  register and another button to switch to login
 *
 * @returns {JSX.Element} Register Form Screen
 */
export function RegisterScreen() {
  const [username, setUsername] = useState<string>('mountainexplorer42');
  const [password, setPassword] = useState<string>('test');
  const [confirmPassword, setConfirmPassword] = useState<string>('test');

  const dispatch = useDispatch<AppDispatch>();

  async function handleRegister() {
    if (password !== confirmPassword) {
      Alert.alert('Register Error', "Passwords don't match");
      return;
    }

    try {
      await dispatch(register({ username, password })).unwrap();
      router.replace('/LoginScreen');
    } catch (payload: any) {
      Alert.alert(
        'Registration Failed',
        payload?.error || 'An unknown error occurred'
      );
    }
  }

  return (
    <View className="flex-1 p-6 bg-white justify-center">
      <View className="mb-8">
        <View className="h-2/3 flex flex-col justify-center">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
            Register
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

          <Text className="text-gray-600 mb-2">Confirm Password</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-6 text-gray-800"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
            placeholder="Enter your password"
          />
        </View>
        <View className=" h-1/4 flex flex-col justify-around">
          <Pressable
            className="bg-blue-500 py-3 rounded-md"
            onPress={async () => await handleRegister()}
          >
            <Text className="text-white text-center font-semibold">
              Register
            </Text>
          </Pressable>

          <Pressable
            className="bg-blue-500 py-3 rounded-md"
            onPress={() => router.replace('/LoginScreen')}
          >
            <Text className="text-white text-center font-semibold">
              Switch to Login
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default RegisterScreen;
