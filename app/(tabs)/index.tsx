import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { poolEnrollments, moneyPool } from '@/fakeData/data';
import MoneyPoolCard from '../Components/MoneyPoolCard';

export default function index() {
  const { User } = useSelector((state: RootState) => state.user);
  return (
    <View className="flex-1 p-6 bg-gray-100 justify-center">
      <MoneyPoolCard moneyPool={moneyPool} />
    </View>
  );
}
