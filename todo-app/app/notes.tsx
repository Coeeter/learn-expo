import { db } from '@/db';
import { notes } from '@/db/schema';
import useThemeColor from '@/hooks/useThemeColor';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, TextInput, View } from 'react-native';

type CreateTodoForm = {
  title: string;
  body: string;
};

export default function CreateTodo() {
  const navigation = useNavigation();
  const textColor = useThemeColor('primaryForeground');
  const queryClient = useQueryClient();
  const form = useForm<CreateTodoForm>();
  const { id } = useLocalSearchParams();

  const { data } = useQuery({
    queryKey: ['note', id],
    queryFn: async () => {
      if (!id || typeof id !== 'string') return null;

      return await db.query.notes.findFirst({
        where: (note, { eq }) => eq(note.id, Number(id)),
      });
    },
  });

  useEffect(() => {
    if (!data) return;

    if (data.title) form.setValue('title', data.title);
    if (data.body) form.setValue('body', data.body);
  }, [data?.title, data?.body]);

  const { mutate: insertNote } = useMutation({
    mutationFn: async () => {
      const formValues = form.getValues();

      if (!formValues.title && !formValues.body) return;

      await db
        .insert(notes)
        .values({
          id: data?.id || undefined,
          title: formValues.title,
          body: formValues.body,
          updatedAt: new Date().toISOString(),
        })
        .onConflictDoUpdate({
          set: {
            title: formValues.title,
            body: formValues.body,
            updatedAt: new Date().toISOString(),
          },
          target: notes.id,
        });
    },
    onSuccess: () => {
      form.reset();
      navigation.goBack();
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  const { mutate: deleteNote } = useMutation({
    mutationFn: async () => {
      if (!data) return;

      await db.delete(notes).where(eq(notes.id, data.id));
    },
    onSuccess: () => {
      navigation.goBack();
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: data ? 'Update Note' : 'Create Note',
          headerLargeTitle: false,
          headerLeft: () => {
            if (!data) return null;

            return (
              <Button title="Delete" color="red" onPress={() => deleteNote()} />
            );
          },
          headerRight: () => {
            return (
              <Button
                title="Save"
                onPress={form.handleSubmit(() => insertNote())}
              />
            );
          },
        }}
      />
      <Controller
        control={form.control}
        name="title"
        render={({ field: { onChange, ...props } }) => (
          <TextInput
            style={[styles.titleInput, { color: textColor }]}
            placeholder="Title"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => form.setFocus('body')}
            onChangeText={onChange}
            autoFocus
            {...props}
          />
        )}
      />
      <Controller
        control={form.control}
        name="body"
        render={({ field: { onChange, ...props } }) => (
          <TextInput
            style={[styles.contentInput, { color: textColor }]}
            placeholder="Body"
            multiline
            onChangeText={onChange}
            {...props}
          />
        )}
      />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentInput: {
    fontSize: 16,
    flex: 1,
    opacity: 0.8,
  },
});
