import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import { RegistrationScreen } from './src/components/RegistrationScreen';

const { width, height } = Dimensions.get('window');
// const window = Dimensions.get('window');
// const screen = Dimensions.get('screen');

export default function App() {
  const [registerData, setRegisterData] = useState([]);
  // const [dimensions, setDimensions] = useState({ window, screen });
  console.log(registerData);

  // useEffect(() => {
  //   console.log(dimensions.window.width);
  //   const subscription = Dimensions.addEventListener(
  //     'change',
  //     ({ window, screen }) => {
  //       setDimensions({ window, screen });
  //     }
  //   );
  //   return () => subscription?.remove();
  // });
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go out?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('./assets/Screens/auth-bg-photo.jpg')}
      >
        <RegistrationScreen setRegisterData={setRegisterData} />
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width < height ? width : height,
    height: width < height ? height : width,
    resizeMode: 'stretch',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
