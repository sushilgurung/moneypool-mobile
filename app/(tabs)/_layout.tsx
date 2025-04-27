import { Tabs } from 'expo-router';
import React from 'react';

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity, View } from 'react-native';
/**
 * layout where user has to be authenticated to access
 *
 * @returns {JSX.Element} tabs layout
 */

export default function TabLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/');
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
        name="CreatePool"
        options={{
          tabBarIcon: () => (
            <View
              className=" h-14 w-16 justify-center items-center mt-3 "
              style={{ backgroundColor: '#9f2b68' }}
            >
              <FontAwesome5 name="plus" size={36} color={'white'} />
            </View>
          ),
          title: '',
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
        name="Setting"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Setting/biometrics"
        options={{
          href: null,
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'none',
            position: 'absolute',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/(tabs)/Setting')}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={36}
                color="black"
              />
            </TouchableOpacity>
          ),
          headerTitle: 'Biometrics',
        }}
      />
      <Tabs.Screen
        name="MoneyPool/index"
        options={{
          href: null,
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={36}
                color="black"
              />
            </TouchableOpacity>
          ),
          headerTitle: '',
        }}
      />
      <Tabs.Screen
        name="MoneyPool/AddMoney"
        options={{
          href: null,
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'none',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={36}
                color="black"
              />
            </TouchableOpacity>
          ),
          headerTitle: '',
        }}
      />
    </Tabs>
  );
}
