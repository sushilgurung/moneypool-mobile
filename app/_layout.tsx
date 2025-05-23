import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import '../global.css';
import AuthProvider from './context/AuthContext';
import WebSocketProvider from './context/websocketContext';

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
        <WebSocketProvider>
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="LoginScreen" />
            <Stack.Screen name="RegisterScreen" />
          </Stack>
        </WebSocketProvider>
      </AuthProvider>
    </Provider>
  );
}

export default RootLayout;
