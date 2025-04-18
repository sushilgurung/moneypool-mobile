import { View, Alert } from 'react-native';

import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { register } from '@/state/user/userSlice';
import AuthForm from './Components/Auth/AuthForm';
import { AuthData } from './Components/Auth/AuthForm';
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
  const dispatch = useDispatch<AppDispatch>();

  async function handleRegister(data: AuthData) {
    const { password, confirmPassword, username } = data;
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
      <AuthForm formType="Register" onSubmit={handleRegister} />
    </View>
  );
}

export default RegisterScreen;
