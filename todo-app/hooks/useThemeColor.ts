import { useColorScheme } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#095b75';

const Colors = {
  light: {
    text: '#11181C',
    background: '#e2e2e2',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: tintColorLight,
    primaryForeground: 'black',
    mutedBackground: 'white',
  },
  dark: {
    text: '#ECEDEE',
    background: 'black',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: tintColorDark,
    primaryForeground: '#fff',
    mutedBackground: '#11181C',
  },
};

export default function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';

  return Colors[theme][colorName];
}
