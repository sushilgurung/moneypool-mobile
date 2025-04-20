import { View, ScrollView } from 'react-native';
import { moneyPools } from '@/fakeData/data';
import MoneyPoolCard from '../Components/MoneyPoolCard/MoneyPoolCard';
import SearchBar from '../Components/SearchBar';
import { useRouter } from 'expo-router';
import { money_pool } from '@/fakeData/schema';

/**
 *  Screen that user sees when first log in, it contains scroll view of all the money pools
 * @returns {JSX.Element} Home Screen
 */
export default function index() {
  const router = useRouter();

  function handleRoute(moneyPool: money_pool) {
    router.push({
      pathname: '/(tabs)/MoneyPool',
      params: { name: moneyPool.pool_name, id: moneyPool.pool_id },
    });
  }
  return (
    <View className="flex h-full bg-gray-100 ">
      <View className="bg-white flex flex-col  p-1 pt-10 gap-10 pb-4 h-full">
        <SearchBar />
        <ScrollView className="pb-4">
          <MoneyPoolCard moneyPool={moneyPools[0]} handleRoute={handleRoute} />
        </ScrollView>
      </View>
      {/* <View className=" w-full flex justify-center  items-center primary-bg h-1/5">
        <TouchableOpacity
          className="bg-white w-28 h-28 rounded-full items-center justify-center shadow-lg "
          onPress={() => console.log('Circular Add Button pressed')}
        >
          <AntDesign name="plus" size={48} color="purple" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
