import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
export default function Test() {
  const { handleBiometricAuth, isBiometricSupported, bioAuth } = useAuth();
  return (
    <View className="flex-1 justify-around items-center ">
      <Text className="text-3xl  text-center">testewqewqeqe</Text>
      <Text className="text-center">
        {isBiometricSupported ? 'supported' : 'not supported'}
      </Text>
      <Text className="text-center">
        {bioAuth ? 'bio auth true' : 'not bio auth'}
      </Text>
      <TouchableOpacity
        onPress={async () => handleBiometricAuth()}
        className="bg-blue-300 p-4 w-1/3 "
      >
        <Text>handle Bio</Text>
      </TouchableOpacity>
    </View>
  );
}
