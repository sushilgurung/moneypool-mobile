import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { moneyPools } from '@/fakeData/data';
import { money_pool } from '@/fakeData/schema';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

/**
 * Component that renders money pool page with all the detail,s
 * @returns {JSX.Element}  Index
 */
export default function Index() {
  const { id } = useLocalSearchParams<{ name: string; id: string }>();

  //get the right moneypool will be via api
  const current: money_pool = moneyPools.filter(
    (pool) => pool.pool_id === Number(id)
  )[0];

  const user = useSelector((state: RootState) => state.user.User);
  const { handleBiometricAuth } = useAuth();
  const router = useRouter();

  const percentage = Math.round(
    (current.current_amount / current.target_amount) * 100
  );
  function currencySign() {
    if (current.currency === 'USD') {
      return '$';
    }
  }

  /** checks if user is using biometrics */
  async function checkMoney() {
    if (user?.using_biometrics) {
      const result = await handleBiometricAuth();
      if (result) {
        router.push('/(tabs)/MoneyPool/AddMoney');
      } else {
        Alert.alert('Biometrics failed please try again');
        return;
      }
    }
    router.push('/(tabs)/MoneyPool/AddMoney');
  }
  return (
    <LinearGradient
      colors={['#7F00FF', '#E100FF']}
      locations={[0.1, 0.9]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1.2, y: 0.7 }}
      style={{
        padding: 24,
        height: '100%',
        flex: 1,
      }}
    >
      <View className="flex-1 items-center justify-center  ">
        <View className="w-11/12 shadow-lg rounded-2xl overflow-hidden bg-white p-4">
          {/* Header Section */}
          <View className="mb-6">
            <Text className="text-center  text-gray-500  font-bold text-2xl mb-2">
              {current.pool_name}
            </Text>
            <Text className="text-center font-bold text-gray-500 text-xl opacity-90 ">
              Goal: {currencySign()}
              {current.target_amount.toLocaleString()}
            </Text>
          </View>

          {/* Progress Section */}
          <View className="h-1/2 items-center justify-center mb-6 gap-4">
            <View className="w-32 h-32 rounded-full border border-gray-300  items-center justify-center overflow-hidden">
              <View
                className="absolute bottom-0 w-full  bg-green-600"
                style={{
                  height: `${percentage}%`,
                }}
              ></View>

              <Text className="text-white flex font-bold text-xl ">
                {percentage}%
              </Text>
            </View>
            <Text className="font-bold text-gray-500 text-xl">
              Current: {currencySign()}
              {current.current_amount.toLocaleString()}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex flex-row justify-between gap-3 mb-2">
            <TouchableOpacity className="flex-1 bg-white border-gray-200 border rounded-xl py-4 items-center shadow-lg  flex flex-row justify-center gap-1">
              <FontAwesome6 name="person" size={24} color="black" />
              <Text className="font-semibold text-black">Members</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-white border-gray-200 border rounded-xl py-4 items-center shadow-lg flex flex-row justify-center gap-1">
              <FontAwesome6
                name="money-bill-transfer"
                size={24}
                color="black"
              />
              <Text className="font-semibold text-black">Transactions</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="border-gray-200 border bg-white rounded-xl py-4 items-center mt-2 shadow-lg"
            onPress={checkMoney}
          >
            <Text className="font-semibold text-black">Add Money</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
