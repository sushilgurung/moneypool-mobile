import { View, ScrollView } from 'react-native';

import { moneyPool } from '@/fakeData/data';
import MoneyPoolCard from '../Components/MoneyPoolCard/MoneyPoolCard';

import SearchBar from '../Components/SearchBar';

/**
 *  Screen that user sees when first log in, it contains scroll view of all the money pools
 * @returns {JSX.Element} Home Screen
 */
export default function index() {
  return (
    <View className="flex h-full bg-gray-100 ">
      <View className="bg-white flex flex-col h-4/5 p-1 pt-10 gap-10 ">
        <SearchBar />
        <ScrollView className="h-4/5">
          <MoneyPoolCard moneyPool={moneyPool} />
          <MoneyPoolCard moneyPool={moneyPool} />
          <MoneyPoolCard moneyPool={moneyPool} />
          <MoneyPoolCard moneyPool={moneyPool} />
          <MoneyPoolCard moneyPool={moneyPool} />
          <MoneyPoolCard moneyPool={moneyPool} />
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
