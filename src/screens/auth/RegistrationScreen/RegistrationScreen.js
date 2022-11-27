import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  ImageBackground,
  StatusBar,
  Dimensions,
  // BackHandler,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import styles from './styles';
import { useTogglePasswordVisibility } from '../../../hooks/useTogglePasswordVisibility';

const addPhoto = require('../../../../assets/add-photo.png');
const statusBarHeight = StatusBar.currentHeight;

export const RegistrationScreen = ({ navigation, setRegisterData }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginOnFocus, setLoginOnFocus] = useState(false);
  const [emailOnFocus, setEmailOnFocus] = useState(false);
  const [passOnFocus, setPassOnFocus] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  // useEffect(() => {
  //   const backAction = () => {
  //     console.log(123);
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction
  //   );
  //   return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };
  useEffect(() => {
    const subscription = ({ window }) => {
      const width = window.width;
      const height = window.height;
      setDimensions({ width, height });
    };

    const windowHendler = Dimensions.addEventListener('change', subscription);
    return () => windowHendler.remove();
  }, []);

  const hendlerSubmit = () => {
    if (login.length === 0 || email.length === 0 || password.length === 0) {
      Alert.alert('Ooops', 'Please fill in all fields');
      return;
    }
    Alert.alert(
      'Credentials',
      `login: ${login}|` + ` Email: ${email}|. ` + ` Pass: ${password}`
    );
    // setRegisterData({
    //   login,
    //   email,
    //   password,
    // });
    setLogin('');
    setEmail('');
    setPassword('');
    keyboardHide();
  };

  const focusInput = StyleSheet.compose(styles.inputContainer, styles.onfocus);
  const blurInput = styles.inputContainer;

  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={{
          ...styles.bgImage,
          width: dimensions.width,
          height: dimensions.height + statusBarHeight,
        }}
        source={require('../../../../assets/Screens/auth-bg-photo.jpg')}
      >
        <KeyboardAvoidingView style={styles.keyboarBox} behavior={'padding'}>
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <ScrollView
              contentContainerStyle={
                dimensions.width > dimensions.height
                  ? styles.scrollViewLandscape
                  : styles.scrollViewPortrait
              }
            >
              <View
                style={[
                  styles.wraper,
                  { paddingBottom: keyboardStatus ? 32 : 78 },
                ]}
              >
                <View style={styles.photoInput}>
                  <Image style={styles.addBtnPhoto} source={addPhoto} />
                </View>
                <View style={styles.form}>
                  <Text style={styles.title}>Реєстрація</Text>

                  <View
                    style={loginOnFocus ? focusInput : blurInput}
                    onFocus={() => setLoginOnFocus(true)}
                    onBlur={() => setLoginOnFocus(false)}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Логін"
                      placeholderTextColor="#BDBDBD"
                      value={login}
                      onChangeText={(text) => setLogin(text)}
                    />
                  </View>

                  <View
                    style={emailOnFocus ? focusInput : blurInput}
                    onFocus={() => setEmailOnFocus(true)}
                    onBlur={() => setEmailOnFocus(false)}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Адрес электронной почты"
                      placeholderTextColor="#BDBDBD"
                      keyboardType="email-address"
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                    />
                  </View>

                  <View
                    style={[
                      passOnFocus ? focusInput : blurInput,
                      { marginBottom: 0 },
                    ]}
                    onFocus={() => setPassOnFocus(true)}
                    onBlur={() => setPassOnFocus(false)}
                  >
                    <TextInput
                      style={styles.input}
                      name="password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={passwordVisibility}
                      placeholder="Пароль"
                      placeholderTextColor="#BDBDBD"
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                      <Text style={styles.showPassBtn}>
                        {rightIcon || password.length === 0
                          ? 'Показати'
                          : 'Приховати'}
                      </Text>
                    </Pressable>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={hendlerSubmit}
                  >
                    <Text style={styles.btnTitle}>Зареєструватись</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ marginTop: 16 }}
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text style={styles.toSingUp}>
                      Вже є обліковий запис? Увійти
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
