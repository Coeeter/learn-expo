import {
  ThemeProvider as NativeThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { PropsWithChildren, FC } from 'react';
import { useColorScheme } from 'react-native';

const ThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const colorScheme = useColorScheme();

  return (
    <NativeThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {children}
    </NativeThemeProvider>
  );
};

export default ThemeProvider;
