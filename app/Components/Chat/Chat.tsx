import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useWebSocket } from '@/app/context/websocketContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

/** WhatsApp-like Chat Component for moneypool */
export default function Chat() {
  const { socket, messages } = useWebSocket();
  const user = useSelector((state: RootState) => state.user.User);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  function sendMessage() {
    if (socket && user && currentMessage.trim()) {
      socket.emit('message', {
        user_id: String(user.user_id),
        message: currentMessage.trim(),
        money_pool_id: '3001',
        date: new Date().toISOString(),
      });
      setCurrentMessage('');
    }
  }

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check if message is from current user
  const isCurrentUser = (messageUserId: string) => {
    return user && String(user.user_id) === messageUserId;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="primary-bg p-4 flex-row items-center">
        <View className="h-10 w-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
          <Text className="text-center text-lg font-bold text-white leading-10">
            MP
          </Text>
        </View>
        <View>
          <Text className="text-white font-bold text-lg">Money Pool Group</Text>
          <Text className="text-white text-xs">
            {messages.length > 0
              ? `${messages.length} messages`
              : 'No messages yet'}
          </Text>
        </View>
      </View>

      {/* Chat area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 p-3"
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {messages.length === 0 ? (
            <View className="flex-1 items-center justify-center py-12">
              <Text className="text-gray-500 text-center">
                No messages yet. Start the conversation!
              </Text>
            </View>
          ) : (
            messages.map((message, index) => (
              // sends your message to right and others on left
              <View
                key={index}
                className={`mb-3 max-w-3/4 ${
                  isCurrentUser(message.user_id)
                    ? 'self-end ml-auto'
                    : 'self-start'
                }`}
              >
                <View
                  className={`rounded-lg p-3 ${
                    isCurrentUser(message.user_id)
                      ? 'secondary-bg rounded-tr-none '
                      : 'bg-white rounded-tl-none'
                  }`}
                >
                  {!isCurrentUser(message.user_id) && (
                    <Text className="text-xs font-bold primary mb-1">
                      User {message.user_id}
                    </Text>
                  )}
                  <Text
                    className={` ${
                      isCurrentUser(message.user_id)
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.message}
                  </Text>
                  <Text
                    className={`text-xs text-gray-500 text-right mt-1 ${
                      isCurrentUser(message.user_id)
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    {formatDate(message.date)}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* Message input */}

        <View className="p-2 border-t border-gray-200 bg-white flex-row items-center">
          {/* fix input enter becoming bigger*/}
          <TextInput
            className="flex-1 border border-gray-300 rounded-full p-3 px-4 text-gray-800 bg-white mr-2"
            placeholder="Type a message"
            onChangeText={setCurrentMessage}
            value={currentMessage}
            multiline
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={!currentMessage.trim()}
            className={`rounded-full p-3 ${
              currentMessage.trim() ? 'primary-bg' : 'bg-gray-300'
            }`}
          >
            <Text className="text-white font-bold">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
