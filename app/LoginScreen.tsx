import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthContext';
import AuthForm, { AuthData } from './Components/Auth/AuthForm';
import { useEffect } from 'react';

/**
 * Component that renders the login auth form
 *
 * @returns {JSX.Element} Login  Screen
 */

export default function LoginScreen() {
  const { login, autoLogin } = useAuth();
  const router = useRouter();
  useEffect(() => {
    handleAutoLogin();
  }, []);

  async function handleAutoLogin() {
    const result = await autoLogin();
    console.log('yo');
    if (result) {
      router.replace('/(tabs)');
    }
  }

  async function handleLogin(data: AuthData) {
    login(data.username, data.password);
  }

  return <AuthForm formType="Login" onSubmit={handleLogin} />;
}
