import { StyleSheet, TouchableOpacity, Text, View, ImageBackground, TextInput, KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback, Dimensions } from 'react-native';
import RegistrationScreen from './screens/RegistrationScreen';
import React, { useState, useEffect } from "react";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import * as Font from "expo-font";


const initialState = {
  login: "",
  mail: "",
  password: ""
}

const loadFonts = () => {
  Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/font/Roboto-Regular.ttf"),
  });
};


export default function App() {
  const [iasReady, setIasReady] = useState(false);
  const [isShowKeyboard, setShowKeyboard] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width - 20 * 2)
  //   const [loaded] = useFonts({
  //     "DMMono-Regular": require("./assets/fonts/font/Roboto-Regular.ttf"),
  // });

  // if (!loaded) {
  //     return null;
  // };



  function showKeyboard(bool) {
    setShowKeyboard(bool)
  }


  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => setKeyboardVisible(true)
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => setKeyboardVisible(false)
  //   );
  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 20 * 2;
      setDimensions(width)
    }
    Dimensions.addEventListener('change', onChange)
    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  console.log(isShowKeyboard)

  if (!iasReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIasReady(true)}
        onError={console.warn}
      />
    );
  }

  function keyboardHide() {
    setShowKeyboard(false);
    Keyboard.dismiss();
  }


  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('./assets/images/bcg-image.jpg')}>
          <RegistrationScreen
            isShowKeyboard={isShowKeyboard}
            keyboardHide={keyboardHide}
            setShowKeyboard={showKeyboard}
            dimesions={dimensions}
          />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "flex-end",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

});

