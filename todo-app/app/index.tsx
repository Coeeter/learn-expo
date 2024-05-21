import ThemedText from '@/components/ThemedText';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Home() {
  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View>
        <ThemedText>TODO: Add a list of todos here</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  button: {
    borderRadius: 999,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
