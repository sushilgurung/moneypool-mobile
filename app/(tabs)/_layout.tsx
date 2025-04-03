import { Tabs } from 'expo-router';
import React from 'react';
import ProtectedRoute from './Components/ProtectedRoute';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <ProtectedRoute>
        <Tabs.Screen name="MoneyPool" />
        <Tabs.Screen name="index" />
        <Tabs.Screen name="Account" />
      </ProtectedRoute>
    </Tabs>
  );
}
