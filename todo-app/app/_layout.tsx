import useThemeColor from '@/hooks/useThemeColor';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const theme = useColorScheme() ?? 'light';

  const backgroundColor = useThemeColor('background');

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor,
              },
              headerStyle: {
                backgroundColor:
                  theme === 'dark'
                    ? 'rgba(30, 30, 30, 0.5)'
                    : 'rgba(255, 255, 255, 0.5)',
              },
              headerTransparent: true,
              headerLargeTitle: true,
              headerBlurEffect: 'regular',
              headerLargeStyle: {
                backgroundColor: backgroundColor,
              },
            }}
          />
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
