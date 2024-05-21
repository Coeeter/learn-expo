import { db } from '@/db';
import useThemeColor from '@/hooks/useThemeColor';
import { MaterialIcons } from '@expo/vector-icons';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Link, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import migrations from '../drizzle/migrations';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      SplashScreen.hideAsync();
    }

    if (error) {
      throw error;
    }
  }, [success, error]);

  if (!success) return null;

  return <RootLayoutNavigation />;
}

function RootLayoutNavigation() {
  const theme = useColorScheme() ?? 'light';
  const buttonTextColor = useThemeColor('primaryForeground');

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerLargeTitle: true,
            headerBlurEffect: 'regular',
            headerTitle: 'Your Notes',
            headerSearchBarOptions: {
              placeholder: 'Search Notes',
              onChangeText: () => {},
            },
            headerRight: () => {
              return (
                <Link href="notes" asChild>
                  <TouchableOpacity activeOpacity={0.8}>
                    <MaterialIcons
                      name="add"
                      size={24}
                      color={buttonTextColor}
                    />
                  </TouchableOpacity>
                </Link>
              );
            },
          }}
        />
        <Stack.Screen name="notes" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
