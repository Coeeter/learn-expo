import ThemedText from '@/components/ThemedText';
import useThemeColor from '@/hooks/useThemeColor';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {
  const theme = useColorScheme() ?? 'light';
  const buttonBackgroundColor = useThemeColor('primary');
  const backgroundColor = useThemeColor('background');
  const buttonTextColor = useThemeColor('primaryForeground');

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Stack.Screen
        options={{
          headerTitle: 'Your Todos',
        }}
      />
      <View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
