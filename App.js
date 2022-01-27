import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Main from './components/Main';






const AuthStack = createNativeStackNavigator();

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf")

  });
};

export default function App() {
  const [iasReady, setIasReady] = useState(false);

  if (!iasReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIasReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
