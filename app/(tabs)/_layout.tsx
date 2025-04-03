import { Tabs } from 'expo-router';
import React from 'react';

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/LoginScreen');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen name="MoneyPool" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="Account" />
    </Tabs>
  );
}
