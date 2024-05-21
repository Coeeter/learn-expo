import useThemeColor from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default function CreateTodo() {
  const contentRef = useRef<TextInput>(null);
  const textColor = useThemeColor('primaryForeground');

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Create Note',
          headerLargeTitle: false,
          headerLeft: () => {
            return <Button title="Delete" color="red" onPress={() => {}} />;
          },
          headerRight: () => {
            return <Button title="Save" onPress={() => {}} />;
          },
        }}
      />
      <TextInput
        style={[styles.titleInput, { color: textColor }]}
        placeholder="Title"
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => contentRef.current?.focus()}
        autoFocus
      />
      <TextInput
        style={[styles.contentInput, { color: textColor }]}
        ref={contentRef}
        placeholder="Body"
        multiline
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
