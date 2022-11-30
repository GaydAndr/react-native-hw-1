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
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

import { authSignUpUser } from './../../../redux/auth/authOperations';
import db from '../../../firebase/config';
import { useTogglePasswordVisibility } from '../../../hooks/useTogglePasswordVisibility';
import { IconButton } from './../../../components/IconButton';

const statusBarHeight = StatusBar.currentHeight;

const initialState = {
  login: '',
  email: '',
  password: '',
};

export const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [state, setstate] = useState(initialState);
  const [loginOnFocus, setLoginOnFocus] = useState(false);
  const [emailOnFocus, setEmailOnFocus] = useState(false);
  const [passOnFocus, setPassOnFocus] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const dispatch = useDispatch();
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

  const handleSubmit = async () => {
    const avatarImg = await uploadAvatarToServer();
    console.log(avatarImg);
    setstate(initialState);
    keyboardHide();
    dispatch(authSignUpUser(state, avatarImg));
  };

  const uploadAvatarToServer = async () => {
    try {
      console.log('avatar', avatar);
      if (avatar) {
        const avatarURL = avatar;
        const response = await fetch(avatarURL);
        const file = await response.blob();
        console.log('file', file);
        const avatarId = nanoid();
        await db.storage().ref(`avatarImage/${avatarId}`).put(file);
        const processedAvatar = await db
          .storage()
          .ref('avatarImage')
          .child(avatarId)
          .getDownloadURL();
        return processedAvatar;
      } else {
        const processedAvatar = await db
          .storage()
          .ref('avatarImage')
          .child('avatar-default-icon.png')
          .getDownloadURL();
        return processedAvatar;
      }
    } catch (error) {
      console.log('error.message', error.message);
      console.log('error.code', error.code);
    }
  };
  const addAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
    });
    console.log('result', result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
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
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatar}>
                    {avatar && (
                      <Image
                        source={{ uri: avatar }}
                        style={styles.avatarImg}
                      />
                    )}
                    {!avatar ? (
                      <TouchableOpacity
                        onPress={addAvatar}
                        style={styles.avatarBtn}
                      >
                        <IconButton type="add-avatar" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setAvatar(null);
                        }}
                        style={styles.avatarBtn}
                      >
                        <IconButton type="remove-avatar" />
                      </TouchableOpacity>
                    )}
                  </View>
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
                      value={state.login}
                      onChangeText={(value) =>
                        setstate((prevState) => ({
                          ...prevState,
                          login: value,
                        }))
                      }
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
                      value={state.email}
                      onChangeText={(value) =>
                        setstate((prevState) => ({
                          ...prevState,
                          email: value,
                        }))
                      }
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
                      value={state.password}
                      onChangeText={(value) =>
                        setstate((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
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
                    onPress={handleSubmit}
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
