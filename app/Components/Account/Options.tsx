import { View, Text } from 'react-native';
import MenuOption from './MenuOption';
import { Ionicons } from '@expo/vector-icons';
/** all the options */
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
export default function Options() {
  return (
    <View>
      {accountSections.map((section) => (
        <View className="mb-6" key={section.id}>
          <View className="flex-row items-center px-4 mb-2">
            <Ionicons
              name={section.icon}
              size={20}
              className="text-blue-600 mr-2"
            />
            <Text className="text-blue-600 font-semibold">{section.title}</Text>
          </View>
          <View className="bg-white rounded-xl mx-4 overflow-hidden">
            {section.items.map((item) => (
              <MenuOption key={item.id} icon={item.icon} title={item.title} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
