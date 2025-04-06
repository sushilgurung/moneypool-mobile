import { useState } from 'react';
import { Pressable, Text, View, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SearchBar() {
  return (
    <View className="w-full max-w-md mx-auto">
      <View className="relative flex flex-row items-center bg-gray-100 rounded-full p-2 shadow-sm">
        <AntDesign name="search1" size={24} color="black" />
        <TextInput
          placeholder="Search..."
          className="w-3/4 bg-transparent px-3 py-1 outline-none"
        />
        <Pressable className=" secondary-bg  px-4 py-1 rounded-full text-sm font-medium transition-colors">
          <Text className="text-white">Search</Text>
        </Pressable>
      </View>
    </View>
  );
}
