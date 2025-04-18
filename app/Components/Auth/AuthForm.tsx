import { View, TextInput, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

/**
 * Component that is used for Register or Login
 *
 * @returns {JSX.Element} AuthForm Component
 */

type authType = {
  formType: 'Login' | 'Register';
  onSubmit: (data: AuthData) => void;
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
    <View className="flex-1 p-6 bg-white justify-center">
      <View className="mb-8">
        <View className="h-2/3 flex flex-col justify-center">
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
          {formType === 'Register' ? (
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
          ) : null}
        </View>
        <View className=" h-1/4 flex flex-col justify-around">
          <Pressable
            className="primary-bg py-5  rounded-md"
            onPress={async () =>
              await onSubmit({ username, password, confirmPassword })
            }
          >
            <Text className="text-white text-center font-semibold">
              {formType}
            </Text>
          </Pressable>

          <Pressable
            className="primary-bg py-5 rounded-md"
            onPress={() => {
              formType === 'Login'
                ? router.replace('/RegisterScreen')
                : router.replace('/LoginScreen');
            }}
          >
            <Text className="text-white text-center font-semibold">
              Switch to {formType === 'Login' ? 'Register' : 'Login'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
