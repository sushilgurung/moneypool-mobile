import { View, Pressable, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

export default function ProfileHeader() {
  const { User } = useSelector((state: RootState) => state.user);

  function getUserInitials() {
    if (!User) return '?';
    if (User.first_name && User.last_name) {
      return `${User.first_name[0]}${User.last_name[0]}`;
    }
    return User.username.substring(0, 2).toUpperCase();
  }

  return (
    <View className="py-6 bg-white border-b border-gray-200 px-4 mb-6">
      {User ? (
        <>
          <View className="flex-row items-center">
            {/* User Avatar - could be replaced with an actual image */}
            <View className="h-20 w-20 rounded-full bg-blue-100 items-center justify-center">
              <Text className="text-xl font-bold text-blue-600">
                {getUserInitials()}
              </Text>
            </View>

            <View className="ml-4 flex-1">
              <Text className="text-xl font-semibold text-gray-800">
                {User.first_name && User.last_name
                  ? `${User.first_name} ${User.last_name}`
                  : User.username}
              </Text>
              <Text className="text-sm text-gray-500">@{User.username}</Text>
              {User.email && (
                <Text className="text-sm text-gray-500 mt-1">{User.email}</Text>
              )}
              <View className="flex-row mt-2">
                <View
                  className={`h-2 w-2 rounded-full mt-1 mr-1 ${
                    User.verified ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                />
                <Text className="text-xs text-gray-600">
                  {User.verified ? 'Account Verified' : 'Verification Required'}
                </Text>
              </View>
            </View>
          </View>

          <Pressable className="mt-4 bg-gray-100 py-2 rounded-lg">
            <Text className="text-blue-600 text-center font-medium">
              Edit Profile
            </Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
}
