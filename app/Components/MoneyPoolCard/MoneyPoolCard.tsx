import { View, Text, TouchableOpacity } from 'react-native';
import { money_pool } from '@/fakeData/schema';
import { LinearGradient } from 'expo-linear-gradient';

type MoneyPoolCardProps = {
  moneyPool: money_pool;
  handleRoute: (moneyPool: money_pool) => void;
};

/**
 * Component that renders money pool card in the home page
 * @returns {JSX.Element}  MoneyPool Card
 */
export default function MoneyPoolCard({
  moneyPool,
  handleRoute,
}: MoneyPoolCardProps) {
  const { pool_name, target_amount, color, current_amount, currency, status } =
    moneyPool;

  // Calculate progress percentage
  const progressPercentage = Math.round(
    Math.min((current_amount / target_amount) * 100, 100)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Status badge color
  const getStatusColor = () => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-400';
      case 'COMPLETED':
        return 'bg-blue-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <TouchableOpacity
      className={`  shadow-2xl mb-4 ml-8 mr-8   `}
      onPress={() => handleRoute(moneyPool)}
    >
      <LinearGradient
        colors={['#7F00FF', '#E100FF']}
        locations={[0.1, 0.9]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1.2, y: 0.7 }}
        style={[{ opacity: 0.9, borderRadius: 16, padding: 16, height: 148 }]}
      >
        {/* Status */}
        <View
          className={`absolute ${getStatusColor()} top-5 right-5 h-4 w-4 rounded-full `}
        ></View>
        {/* Header */}
        <View className="flex-row justify-start items-center mb-2 ">
          <View className="flex justify-between  h-full">
            <Text className="text-2xl font-bold text-white">{pool_name}</Text>
            <View className="flex-row gap-1 ">
              <Text className="text-white font-bold text-lg">
                {formatCurrency(current_amount)}
              </Text>
              <Text className="text-white font-bold text-lg">
                of {formatCurrency(target_amount)}
              </Text>
            </View>
            <View className="flex  w-full flex-row gap-10  items-center ">
              {/* Progress bar */}
              <View
                className="  w-2/3 h-4 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
              >
                <View
                  style={{ width: `${progressPercentage}%` }}
                  className="h-4 rounded-tl-full rounded-bl-full bg-white opacity-100 "
                ></View>
              </View>
              <Text className="text-white font-bold text-lg">
                {progressPercentage}%
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
