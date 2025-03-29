import { Text, View } from 'react-native';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export default function Index() {
  const tasks = useSelector((state: RootState) => state);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    ></View>
  );
}
