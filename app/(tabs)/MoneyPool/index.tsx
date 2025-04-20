import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { moneyPools } from '@/fakeData/data';
import { money_pool } from '@/fakeData/schema';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'expo-router';

export default function Index() {
  const { id } = useLocalSearchParams<{ name: string; id: string }>();
  const current: money_pool = moneyPools.filter(
    (pool) => pool.pool_id === Number(id)
  )[0];

  const { handleBiometricAuth, isBiometricSupported } = useAuth();
  const router = useRouter();
  function currencySign() {
    if (current.currency === 'USD') {
      return '$';
    }
  }

  async function checkMoney() {
    if (isBiometricSupported) {
      const result = await handleBiometricAuth();
      if (result) {
        router.push('/(tabs)/MoneyPool/AddMoney');
        console.log('pass');
      } else {
        console.log('fail');
      }
    }
    router.push('/(tabs)/MoneyPool/AddMoney');
  }
  return (
    <View className="flex-1 items-center justify-center py-6">
      <View className="w-11/12 shadow-lg rounded-2xl overflow-hidden">
        <LinearGradient
          colors={['#7F00FF', '#E100FF']}
          locations={[0.1, 0.9]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.2, y: 0.7 }}
          style={{
            borderRadius: 16,
            padding: 24,
            height: '100%',
          }}
        >
          {/* Header Section */}
          <View className="mb-6">
            <Text className="text-center text-white font-bold text-2xl mb-2">
              {current.pool_name}
            </Text>
            <Text className="text-center text-white text-xl opacity-90 ">
              Goal: {currencySign()}
              {current.target_amount.toLocaleString()}
            </Text>
          </View>

          {/* Progress Section */}
          <View className="h-1/2 items-center justify-center mb-6 gap-4">
            {/* You can add a circular progress component here */}
            <View className="w-32 h-32 rounded-full border-4 border-white bg-white/20 items-center justify-center">
              <Text className="text-white font-bold text-xl">
                {Math.round(
                  (current.current_amount / current.target_amount) * 100
                )}
                %
              </Text>
            </View>
            <Text className="font-bold text-white text-xl">
              Current: {currencySign()}
              {current.current_amount.toLocaleString()}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex flex-row justify-between gap-3 mb-2">
            <TouchableOpacity className="flex-1 bg-white rounded-xl py-4 items-center shadow-sm flex flex-row justify-center gap-1">
              <FontAwesome6 name="person" size={24} color="black" />
              <Text className="font-semibold text-black">Members</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-white rounded-xl py-4 items-center shadow-sm flex flex-row justify-center gap-1">
              <FontAwesome6
                name="money-bill-transfer"
                size={24}
                color="black"
              />
              <Text className="font-semibold text-black">Transactions</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-white rounded-xl py-4 items-center mt-2 shadow-sm"
            style={{ elevation: 2 }}
            onPress={checkMoney}
          >
            <Text className="font-semibold text-purple-800">Add Money</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}
