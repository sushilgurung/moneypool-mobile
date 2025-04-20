import { View, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

/**
 * Component that renders the searchbar that will be used to search the moneypools
 * @returns {JSX.Element}  SearchBar
 */
export default function SearchBar() {
  return (
    <View className="w-full max-w-md mx-auto">
      <View className="relative flex flex-row items-center bg-gray-100 rounded-full p-2 shadow-sm">
        <AntDesign name="search1" size={24} color="black" />
        <TextInput
          placeholder="Search..."
          className="w-3/4 bg-transparent px-3 py-1 outline-none"
        />
      </View>
    </View>
  );
}
