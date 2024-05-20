import useThemeColor from '@/hooks/useThemeColor';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const theme = useColorScheme() ?? 'light';

  const backgroundColor = useThemeColor('background');

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor,
            },
            contentStyle: {
              backgroundColor,
            },
          }}
        />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
