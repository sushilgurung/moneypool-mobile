import { Ionicons } from '@expo/vector-icons';

// Define the icon type based on what Ionicons accepts
export type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

// Define the icon type for MenuOption
export type MenuOptionIcon =
  | 'settings-outline'
  | 'notifications-outline'
  | 'shield-outline'
  | 'person-outline'
  | 'create-outline'
  | 'help-circle-outline'
  | 'color-palette-outline'
  | 'help-buoy-outline'
  | 'key-outline';

// Define types for our data structure
export interface MenuItem {
  id: string;
  title: string;
  icon: MenuOptionIcon;
  route: string;
}

export interface Section {
  id: string;
  title: string;
  icon: IoniconsName;
  items: MenuItem[];
}

/** all the options */
export const accountSections: Section[] = [
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
