import ThemedText from '@/components/ThemedText';
import useThemeColor from '@/hooks/useThemeColor';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {
  const buttonBackgroundColor = useThemeColor('primary');
  const buttonTextColor = useThemeColor('primaryForeground');

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.todosContainer}>
        <ThemedText>TODO: Add a list of todos here</ThemedText>
      </View>
      <Link
        href="todo"
        asChild
        style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
      >
        <TouchableOpacity activeOpacity={0.8}>
          <MaterialIcons name="add" size={24} color={buttonTextColor} />
          <ThemedText
            style={{
              color: buttonTextColor,
            }}
          >
            Create a new Todo
          </ThemedText>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    paddingBottom: 32,
  },
  todosContainer: {
    flex: 1,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
