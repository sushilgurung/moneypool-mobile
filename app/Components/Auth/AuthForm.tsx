import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Image } from 'react-native';

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
    <ImageBackground
      source={require('../../../assets/images/background1.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="flex-1 justify-center">
        <View className="w-full">
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
          {/** Icon */}
          {formType === 'Login' ? (
            <View className="mb-10 w-full items-center h-24 justify-center">
              <View className="rounded-full primary-bg h-16 w-16 items-center flex justify-center">
                <FontAwesome6
                  name="money-check-dollar"
                  size={24}
                  color="white"
                />
              </View>
            </View>
          ) : (
            <View className="h-24 mb-10"></View>
          )}

          <Text className="text-2xl font-bold text-gray-800 mb-6">
            {formType}
          </Text>

          <Text className="text-gray-600 mb-2">Username</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-4 text-gray-800 bg-white"
            onChangeText={setUsername}
            value={username}
            placeholder="Enter your username"
          />

          <Text className="text-gray-600 mb-2">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-6 text-gray-800 bg-white"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Enter your password"
          />
          {/** Confirm Password */}
          {formType === 'Register' ? (
            <>
              <Text className="text-gray-600 mb-2">Confirm Password</Text>
              <TextInput
                className="border border-gray-300 rounded-md p-3 mb-6 text-gray-800 bg-white"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry
                placeholder="Enter your password"
              />
            </>
          ) : null}
          <TouchableOpacity
            className="primary-bg py-5 rounded-md"
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
          ) : null}
        </View>

        <View className="h-1/4 flex flex-col justify-between p-6">
          {/** Switch to Register Button */}
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
          {/* Removed the Image component from here */}
        </View>
      </View>
    </ImageBackground>
  );
}
