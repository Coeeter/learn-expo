import useThemeColor from '@/hooks/useThemeColor';
import { StyleSheet, Text, TextProps } from 'react-native';

type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle' | 'link';
};

export default function ThemedText({
  style,
  type = 'default',
  ...props
}: ThemedTextProps) {
  const color = useThemeColor('text');

  return <Text style={[{ color }, styles[type], style]} {...props} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 24,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
