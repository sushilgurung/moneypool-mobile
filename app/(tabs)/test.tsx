import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Test() {
  const {
    isBiometricSupported,

    handleBiometricAuth,
  } = useAuth();

  return (
    <View className="flex-1 justify-around items-center ">
      <Text className="text-center">
        {isBiometricSupported ? 'supported' : 'not supported'}
      </Text>
      {isBiometricSupported ? (
        <View>
          <Text>Enable Biometric Login:</Text>

          <TouchableOpacity onPress={handleBiometricAuth}>
            <Text>try bio auth</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Biometric authentication is not supported on this device.</Text>
      )}
    </View>
  );
}
