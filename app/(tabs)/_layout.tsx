import { Tabs } from 'expo-router';
import React from 'react';

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

/**
 * layout where there has to be user to access
 *
 * @returns {JSX.Element} tabs layout
 */

export default function TabLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/LoginScreen');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#9f2b68',
        tabBarInactiveTintColor: 'black',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Contact"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="swimming-pool" size={24} color={color} />
          ),
          title: 'Money Pools',
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="swimming-pool" size={24} color={color} />
          ),
          title: 'test',
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
