import { View } from 'react-native';

import { useAuth } from './context/AuthContext';

import AuthForm, { AuthData } from './Components/Auth/AuthForm';

/**
 * Component that renders the LoginScreen component for user authentication. Has
 * a username and password input with a button to login and another button
 * to switch to registration
 *
 * @returns {JSX.Element} Login Form Screen
 */

export default function LoginScreen() {
  const { login } = useAuth();

  function handleLogin(data: AuthData) {
    login(data.username, data.password);
  }

  return (
    <View className="flex-1 p-6 bg-white justify-center">
      <AuthForm formType="Login" onSubmit={handleLogin} />
    </View>
  );
}
