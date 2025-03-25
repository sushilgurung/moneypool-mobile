import { Text, View } from 'react-native';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export default function Index() {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {tasks.map((task) => (
        <Text className="text-4xl " key={task.id}>
          {task.name}
        </Text>
      ))}
    </View>
  );
}
