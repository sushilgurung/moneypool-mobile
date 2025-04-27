import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { fetch } from 'expo/fetch';

type socketState = 'disconnected' | 'connected' | 'connecting' | 'error';
export type WebSocketContextType = {
  messages: Message[];
  connectionState: socketState;
};

type Message = {
  user_id: number;
  message: string;
  money_pool_id: string;
  date: string;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);
/**
 * ContextProvider for web socket so user can get realtime updates to their money pool transactions
 *
 */
export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [connectionState, setConnectionState] =
    useState<socketState>('connecting');

  useEffect(() => {
    socketRef.current = io(process.env.EXPO_PUBLIC_URL, {
      transports: ['websocket'],
      forceNew: true,
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to server with ID:', socketRef.current?.id);
      setConnectionState('connected');

      socketRef.current?.emit('message', {
        text: 'yoo',
        timestamp: new Date(),
      });
    });

    // Handle messages from server
    socketRef.current.on('message', (data) => {
      console.log('Message from server:', data);
    });

    // Handle connection errors
    socketRef.current.on('connect_error', (error) => {
      console.log('Connection error:', error);
      setConnectionState('error');
    });

    // Handle disconnections
    socketRef.current.on('disconnect', (reason) => {
      console.log('Disconnected from server:', reason);
      setConnectionState('disconnected');
    });

    // Cleanup function when component unmounts
    return () => {
      console.log('Cleaning up socket connection');
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  async function getMessages() {
    //pretend api call
    setMessages([]);
  }

  const value = {
    messages,
    connectionState,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
