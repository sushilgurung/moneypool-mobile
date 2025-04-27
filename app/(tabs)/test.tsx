import { View, Text, TouchableOpacity } from 'react-native';
import { useWebSocket } from '../context/websocketContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
export default function test() {
  const { connectionState, socket, messages } = useWebSocket();
  const user = useSelector((state: RootState) => state.user.User);

  function sendMessage() {
    if (socket && user) {
      socket.emit('message', {
        user_id: String(user.user_id),
        message: 'whatups',
        money_pool_id: '3001',
        date: new Date().toDateString(),
      });
    }
  }

  return (
    <View className="flex-1 justify-center">
      {connectionState === 'connected' && socket ? (
        <View className="">
          <Text>connected</Text>
          <TouchableOpacity className=" p-4 bg-blue-500 " onPress={sendMessage}>
            <Text>send message</Text>
          </TouchableOpacity>
          <View>
            {messages.map((message, index) => (
              <Text key={index}>
                {message.user_id}:{message.message} at{message.date}
              </Text>
            ))}
          </View>
        </View>
      ) : (
        <Text>not connected</Text>
      )}
    </View>
  );
}
