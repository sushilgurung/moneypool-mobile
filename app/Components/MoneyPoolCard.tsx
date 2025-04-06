import { View, Text, TouchableOpacity } from 'react-native';
import { money_pool } from '@/fakeData/schema';

export default function MoneyPoolCard({
  moneyPool,
}: {
  moneyPool: money_pool;
}) {
  const {
    pool_name,
    target_amount,
    current_amount,
    currency,
    status,
    created_at,
  } = moneyPool;

  // Calculate progress percentage
  const progressPercentage = Math.min(
    (current_amount / target_amount) * 100,
    100
  );

  // Format date
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

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
    <View className=" bg-white p-4 shadow-md mb-4 ml-4 mr-4">
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
        <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full bg-blue-600"
            style={{ width: `${progressPercentage}%` }}
          />
        </View>
        <Text className="text-right text-xs text-gray-500 mt-1">
          {progressPercentage.toFixed(0)}%
        </Text>
      </View>

      {/* Footer */}
      <View className="flex-row justify-between items-center">
        <Text className="text-xs text-gray-500">Created {formattedDate}</Text>
        <TouchableOpacity className="px-3 py-2 bg-blue-500 rounded-lg">
          <Text className="text-white font-medium text-xs">Contribute</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
