import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="MoneyPool" />
      <Tabs.Screen name="Account" />
    </Tabs>
  );
}
