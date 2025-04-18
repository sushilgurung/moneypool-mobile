import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import '../global.css';
import AuthProvider from './context/AuthContext';

/**
 * Layout component that has all the screens via Stack.
 *
 * The  Screens are wrapped in react redux store provider and authProvider
 *
 *
 *
 */

export function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="index" />
          <Stack.Screen name="RegisterScreen" />
        </Stack>
      </AuthProvider>
    </Provider>
  );
}

export default RootLayout;
