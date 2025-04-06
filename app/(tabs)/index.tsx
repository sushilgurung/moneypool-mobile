import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { poolEnrollments, moneyPool } from '@/fakeData/data';
import MoneyPoolCard from '../Components/MoneyPoolCard';
import {
  Feather,
  AntDesign,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import SearchBar from '../Components/SearchBar';

export default function index() {
  const { User } = useSelector((state: RootState) => state.user);
  return (
    <View className="flex h-full bg-gray-100 ">
      <View className="primary-bg flex flex-col h-4/5 p-1 pt-10 gap-10 ">
        <SearchBar />
        <ScrollView>
          <MoneyPoolCard moneyPool={moneyPool} />
          <MoneyPoolCard moneyPool={moneyPool} />
          <MoneyPoolCard moneyPool={moneyPool} />
          <MoneyPoolCard moneyPool={moneyPool} />
          <MoneyPoolCard moneyPool={moneyPool} />
          <MoneyPoolCard moneyPool={moneyPool} />
        </ScrollView>
      </View>
      <View className=" w-full flex justify-center  items-center primary-bg h-1/5">
        <TouchableOpacity
          className="bg-white w-28 h-28 rounded-full items-center justify-center shadow-lg "
          onPress={() => console.log('Circular Add Button pressed')}
        >
          <AntDesign name="plus" size={48} color="purple" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
