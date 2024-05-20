import { useRef } from 'react';
import { Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const isFirstRender = useRef(true);

  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;

  return (
    <Image
      source={imageSource}
      style={styles.image}
      onLoad={async () => {
        if (!isFirstRender.current) return;
        isFirstRender.current = false;
        await SplashScreen.hideAsync();
      }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
