import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Component that renders the menu option that comes under the account section
 * @returns {JSX.Element}   Menu option item with icon, title and forward chevron
 */
export default function MenuOption({
  icon,
  title,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
}) {
  return (
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
}
