import ThemeProvider from '@/components/ThemeProvider';
import { Stack } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import 'react-native-reanimated';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
            headerLargeTitle: true,
            headerBlurEffect: 'regular',
            headerTransparent: true,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
