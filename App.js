import { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  BackHandler,
  Alert,
  StatusBar,
} from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { RegistrationScreen } from './src/components/RegistrationScreen/RegistrationScreen';
import { LoginScreen } from './src/components/LoginScreen/LoginScreen';

const statusBarHeight = StatusBar.currentHeight;

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
  });
  const [registerData, setRegisterData] = useState([]);
  console.log(registerData);

  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();

    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go out?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <RegistrationScreen setRegisterData={setRegisterData} />
      {/* <LoginScreen setRegisterData={setRegisterData} /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
