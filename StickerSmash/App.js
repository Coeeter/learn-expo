import { launchImageLibraryAsync } from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Button from './components/Button';
import CircleButton from './components/CircleButton';
import EmojiList from './components/EmojiList';
import EmojiPicker from './components/EmojiPicker';
import EmojiSticker from './components/EmojiSticker';
import IconButton from './components/IconButton';
import ImageViewer from './components/ImageViewer';
import { saveToLibraryAsync, usePermissions } from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domToImage from 'dom-to-image';
import * as SplashScreen from 'expo-splash-screen';

const PlaceholderImage = require('./assets/images/background-image.png');

SplashScreen.preventAutoHideAsync();

export default function App() {
  const imageRef = useRef();
  const [status, requestPermission] = usePermissions();
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return alert('You did not select any image.');
    }

    setSelectedImage(result.assets[0].uri);
    setShowAppOptions(true);
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(null);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      if (Platform.OS === 'web') {
        const dataUrl = await domToImage.toJpeg(imageRef.current, {
          quality: 0.9,
          width: 320,
          height: 440,
        });

        const link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();

        alert('Image saved successfully!');

        return;
      }

      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await saveToLibraryAsync(localUri);

      if (localUri) {
        alert('Image saved successfully!');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while saving the image.');
    }
  };

  useEffect(() => {
    if (status === null) {
      requestPermission();
    }
  }, [status]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme={'primary'}
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    overflow: 'hidden',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
