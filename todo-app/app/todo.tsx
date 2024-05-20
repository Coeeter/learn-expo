import ThemedText from '@/components/ThemedText';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function CreateTodo() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create Todo' }} />
      <ThemedText type="title">Create a new Todo</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
