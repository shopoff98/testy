import useRoute from './route';
import RegistrationScreen from './components/Screens/Auth/RegistrationScreen';
import LoginScreen from './components/Screens/Auth/LoginScreen';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


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
  const routing = useRoute(true)

  return (
    <NavigationContainer>
     {routing}
    </NavigationContainer>
  )
}
