import ThemedText from '@/components/ThemedText';
import { db } from '@/db';
import { useSearchStore } from '@/hooks/useSearch';
import useThemeColor from '@/hooks/useThemeColor';
import { useQuery } from '@tanstack/react-query';
import { useNavigation, useRouter } from 'expo-router';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

export default function Home() {
  const { push } = useRouter();
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = useThemeColor('mutedBackground');
  const search = useSearchStore(state => state.query);
  const { data } = useQuery({
    queryKey: ['notes', search],
    queryFn: async () => {
      return await db.query.notes.findMany({
        where: (note, { like }) => like(note.title, `%${search}%`),
      });
    },
  });

  return (
    <FlatList
      style={styles.container}
      data={data}
      contentInsetAdjustmentBehavior="automatic"
      renderItem={({ item, index }) => {
        return (
          <Pressable
            key={index}
            style={({ pressed }) => [
              {
                padding: 8,
                borderRadius: 8,
                backgroundColor: backgroundColor,
                marginBottom: 8,
              },
              index === 0 && { marginTop: 16 },
              pressed && {
                opacity: theme === 'dark' ? 0.8 : 0.5,
              },
            ]}
            onPress={() => push(`/notes?id=${item.id}`)}
          >
            <ThemedText type="subtitle">{item.title}</ThemedText>
            <ThemedText numberOfLines={2} ellipsizeMode="tail">
              {item.body}
            </ThemedText>
            {item.updatedAt && (
              <ThemedText
                style={{
                  fontSize: 12,
                }}
              >
                {new Date(item.updatedAt).toLocaleDateString()}
              </ThemedText>
            )}
          </Pressable>
        );
      }}
    />
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
