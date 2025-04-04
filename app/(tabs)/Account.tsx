import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Define sections for the account screen
const accountSections = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: 'person-outline',
    items: [
      {
        id: 'profile',
        title: 'Edit Profile',
        icon: 'create-outline',
        route: '/profile',
      },
      {
        id: 'password',
        title: 'Change Password',
        icon: 'key-outline',
        route: '/password',
      },
      {
        id: 'notification',
        title: 'Notification Settings',
        icon: 'notifications-outline',
        route: '/notifications',
      },
    ],
  },
  {
    id: 'app',
    title: 'App Settings',
    icon: 'settings-outline',
    items: [
      {
        id: 'theme',
        title: 'App Theme',
        icon: 'color-palette-outline',
        route: '/theme',
      },

      {
        id: 'privacy',
        title: 'Privacy Settings',
        icon: 'shield-outline',
        route: '/privacy',
      },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    icon: 'help-buoy-outline',
    items: [
      {
        id: 'help',
        title: 'Help ',
        icon: 'help-circle-outline',
        route: '/help',
      },
    ],
  },
];

// Menu item component
const MenuItem = ({ icon, title }: { icon: string; title: string }) => (
  <Pressable className="flex-row items-center px-4 py-3 border-b border-gray-100 active:bg-gray-50">
    <Ionicons name={icon} size={22} className="text-gray-600" />
    <Text className="flex-1 ml-3 text-gray-800 font-medium">{title}</Text>
    <Ionicons
      name="chevron-forward-outline"
      size={18}
      className="text-gray-400"
    />
  </Pressable>
);

// Section component
const Section = ({
  title,
  icon,
  items,
}: {
  title: string;
  icon: string;
  items: {
    id: string;
    title: string;
    icon: string;
    route: string;
  }[];
}) => (
  <View className="mb-6">
    <View className="flex-row items-center px-4 mb-2">
      <Ionicons name={icon} size={20} className="text-blue-600 mr-2" />
      <Text className="text-blue-600 font-semibold">{title}</Text>
    </View>
    <View className="bg-white rounded-xl mx-4 overflow-hidden">
      {items.map((item) => (
        <MenuItem key={item.id} icon={item.icon} title={item.title} />
      ))}
    </View>
  </View>
);

// Main account screen component
export default function AccountScreen() {
  const { User } = useSelector((state: RootState) => state.user);
  const { logout } = useAuth();

  // Function to get user initials for avatar placeholder
  const getUserInitials = () => {
    if (!User) return '?';
    if (User.first_name && User.last_name) {
      return `${User.first_name[0]}${User.last_name[0]}`;
    }
    return User.username.substring(0, 2).toUpperCase();
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {User ? (
        <>
          {/* User Profile Header */}
          <View className="py-6 bg-white border-b border-gray-200 px-4 mb-6">
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
                  <Text className="text-sm text-gray-500 mt-1">
                    {User.email}
                  </Text>
                )}
                <View className="flex-row mt-2">
                  <View
                    className={`h-2 w-2 rounded-full mt-1 mr-1 ${
                      User.verified ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  />
                  <Text className="text-xs text-gray-600">
                    {User.verified
                      ? 'Account Verified'
                      : 'Verification Required'}
                  </Text>
                </View>
              </View>
            </View>

            <Pressable className="mt-4 bg-gray-100 py-2 rounded-lg">
              <Text className="text-blue-600 text-center font-medium">
                Edit Profile
              </Text>
            </Pressable>
          </View>

          {/* Account Settings Sections */}
          {accountSections.map((section) => (
            <Section
              key={section.id}
              title={section.title}
              icon={section.icon}
              items={section.items}
            />
          ))}

          {/* Account Info */}
          <View className="px-4 my-6">
            <Text className="text-xs text-gray-400 text-center">
              Account ID: {User.user_id}
            </Text>
            <Text className="text-xs text-gray-400 text-center">
              Member since: {new Date(User.created_at).toLocaleDateString()}
            </Text>
            <Text className="text-xs text-gray-400 text-center">
              Last active: {new Date(User.last_active).toLocaleDateString()}
            </Text>
          </View>

          {/* Logout Button */}
          <View className="px-4 mb-8">
            <Pressable
              className="bg-red-100 py-4 rounded-xl border border-red-200 active:bg-red-200"
              onPress={logout}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  className="text-red-600 mr-2"
                />
                <Text className="text-red-600 font-semibold">Logout</Text>
              </View>
            </Pressable>
          </View>

          {/* App Version */}
          <Text className="text-xs text-gray-400 text-center mb-8">
            App Version: 1.0.0
          </Text>
        </>
      ) : (
        <View className="flex-1 items-center justify-center py-20">
          <Text className="text-lg text-gray-600 mb-4">
            Please log in to view your account
          </Text>
          <Pressable
            className="bg-blue-600 px-8 py-3 rounded-lg"
            onPress={() => router.push('/LoginScreen')}
          >
            <Text className="text-white font-semibold">Login</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
