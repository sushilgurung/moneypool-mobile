import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import '../global.css';
import AuthProvider from './context/AuthContext';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="LoginScreen" />
          <Stack.Screen name="RegisterScreen" />
          <Stack.Screen name="HomeScreen" />
        </Stack>
      </AuthProvider>
    </Provider>
  );
}
