import { View } from 'react-native';
import { useAuth } from './context/AuthContext';
import AuthForm, { AuthData } from './Components/Auth/AuthForm';

/**
 * Component that renders the login auth form
 *
 * @returns {JSX.Element} Login  Screen
 */

export default function index() {
  const { login } = useAuth();

  async function handleLogin(data: AuthData) {
    login(data.username, data.password);
  }

  return (
    <View className="flex-1  bg-white justify-center">
      <AuthForm formType="Login" onSubmit={handleLogin} />
    </View>
  );
}
