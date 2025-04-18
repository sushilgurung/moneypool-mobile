import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
/**
 * Component that is used for Register or Login
 *
 * @returns {JSX.Element} AuthForm Component
 */

type authType = {
  formType: 'Login' | 'Register';
  onSubmit: (data: AuthData) => Promise<void>;
};

export interface AuthData {
  username: string;
  password: string;
  confirmPassword?: string;
  email?: string;
}
export default function AuthForm({ formType, onSubmit }: authType) {
  const [username, setUsername] = useState<string>('alex_smith');
  const [password, setPassword] = useState<string>('test');
  const [confirmPassword, setConfirmPassword] = useState<string>('test');

  return (
    <View className="flex-1  bg-white justify-center ">
      <View className="w-full  ">
        {formType === 'Register' ? (
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              }
            }}
          >
            <Ionicons name="chevron-back" size={36} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>
      <View className="h-2/3 flex flex-col justify-center p-6">
        <Text className="text-2xl font-bold  text-gray-800 mb-6">
          {formType}
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

        <TouchableOpacity
          className="primary-bg py-5  rounded-md"
          onPress={async () =>
            await onSubmit({ username, password, confirmPassword })
          }
        >
          <Text className="text-white text-center font-semibold">
            {formType}
          </Text>
        </TouchableOpacity>
        {formType === 'Login' ? (
          <TouchableOpacity className="mt-4">
            <Text className="text-center">Forgot Password?</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text className="text-gray-600 mb-2">Confirm Password</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-3 mb-6 text-gray-800"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry
              placeholder="Enter your password"
            />
          </>
        )}
      </View>

      <View className=" h-1/4  flex flex-col justify-center p-6  ">
        {formType === 'Login' ? (
          <TouchableOpacity
            className="primary-bg py-5 rounded-md"
            onPress={() => {
              formType === 'Login'
                ? router.push('/RegisterScreen')
                : router.navigate('/');
            }}
          >
            <Text className="text-white text-center font-semibold">
              Switch to Register
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
