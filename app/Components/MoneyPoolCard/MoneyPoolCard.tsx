import { View, Text, TouchableOpacity } from 'react-native';
import { money_pool } from '@/fakeData/schema';
import Svg, { Circle } from 'react-native-svg';
import RadialBar from './RadialBar';
/**
 * Component that renders money pool card in the home page
 * @returns {JSX.Element}  MoneyPool Card
 */
export default function MoneyPoolCard({
  moneyPool,
}: {
  moneyPool: money_pool;
}) {
  const { pool_name, target_amount, color, current_amount, currency, status } =
    moneyPool;

  // Calculate progress percentage
  const progressPercentage = Math.round(
    Math.min((current_amount / target_amount) * 100, 100)
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Status badge color
  const getStatusColor = () => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500';
      case 'COMPLETED':
        return 'bg-blue-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <View
      className={` p-4 shadow-lg mb-4 ml-4 mr-4 rounded-md `}
      // style={{ backgroundColor: color }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-gray-800">{pool_name}</Text>
        <View className={`px-2 py-1 rounded-full ${getStatusColor()}`}>
          <Text className="text-xs font-medium text-white capitalize">
            {status}
          </Text>
        </View>
      </View>

      {/* Amount info */}
      <View className="mb-3">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-gray-500 text-sm">Progress</Text>
          <Text className="text-gray-500 text-sm">
            {formatCurrency(current_amount)} / {formatCurrency(target_amount)}
          </Text>
        </View>

        {/* Progress bar */}
        <RadialBar size={60} strokeWidth={5} progress={progressPercentage} />
      </View>
    </View>
  );
}
