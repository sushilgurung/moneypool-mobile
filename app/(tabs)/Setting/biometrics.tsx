import React, { useState, useEffect } from 'react'; // Import useState
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/state/store';
import { updateUser } from '@/state/user/userSlice';
import { useRouter } from 'expo-router';

export default function BiometricScreen() {
  const user = useSelector((state: RootState) => state.user.User);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  // Use local state to manage the switch value
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);

  useEffect(() => {
    if (user) {
      setIsBiometricsEnabled(user.using_biometrics);
    }
  }, [user]);

  function handleBiometricsChange(newValue: boolean) {
    setIsBiometricsEnabled(newValue); // Update local state immediately
    if (user) {
      dispatch(
        updateUser({
          user_id: user.user_id,
          using_biometrics: newValue, // Send the *new* value
        })
      );
    }
  }

  return (
    <View className="flex-l  h-full">
      <View className="h-full flex justify-center items-center">
        <Text>Biometrics</Text>
        {user ? (
          <Switch
            value={isBiometricsEnabled} // Use local state for the value
            onValueChange={handleBiometricsChange}
          />
        ) : null}
      </View>
    </View>
  );
}
