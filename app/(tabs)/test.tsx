import { View, Text } from 'react-native';
import { useWebSocket } from '../context/websocketContext';
import { useEffect } from 'react';
export default function test() {
  const { connectionState } = useWebSocket();

  return (
    <View>
      {connectionState === 'connected' ? (
        <Text>connected</Text>
      ) : (
        <Text>not connected</Text>
      )}
    </View>
  );
}
