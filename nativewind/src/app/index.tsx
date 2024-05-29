import { Pressable, ScrollView, Text } from 'react-native';

export default function HomePage() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="p-3">
      <Text className="font-bold text-2xl text-black dark:text-white">
        Hello World
      </Text>
      <Pressable className="bg-slate-900 dark:bg-slate-200 w-fit p-3 rounded-full items-center my-3 active:opacity-75">
        <Text className="text-white w-fit text-sm dark:text-black">
          Click Me
        </Text>
      </Pressable>
    </ScrollView>
  );
}
