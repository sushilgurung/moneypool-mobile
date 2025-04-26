import { useState, useEffect, useRef, createContext, useContext } from 'react';

type socketState = 'disconnected' | 'connected' | 'connecting';
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
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [connectionState, setConnectionState] =
    useState<socketState>('disconnected');

  useEffect(() => {}, []);

  //setting up websocket
  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3000');
    socketRef.current.addEventListener('open', (event) => {
      console.log('Connected to WebSocket server');
      setConnectionState('connected');
      socketRef.current?.send('Connection established');
      getMessages();
    });

    //listern for transactions
    socketRef.current.addEventListener('message', (event) => {
      const message =
        typeof event.data === 'string' && event.data.startsWith('{')
          ? JSON.parse(event.data)
          : event.data;
      setMessages((prev) => [...prev, message]);
    });

    // Handle connection closure
    socketRef.current.addEventListener('close', () => {
      console.log('Disconnected from WebSocket server');
      setConnectionState('disconnected');
    });

    return () => {
      socketRef.current?.close();
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
