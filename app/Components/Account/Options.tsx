import { View, Text } from 'react-native';
import MenuOption from './MenuOption';
import { Ionicons } from '@expo/vector-icons';
import { accountSections } from './typesAndData';
import { useRouter } from 'expo-router';

/**
 * Component that renders all account options organized in sections
 *
 * @returns {JSX.Element} The account options
 */
export default function Options() {
  const router = useRouter();

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
              <MenuOption
                key={item.id}
                icon={item.icon}
                title={item.title}
                onPress={() => router.push('/(tabs)/Setting/biometrics')}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
