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
  BackHandler,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import styles from './styles';
import addPhoto from '../../../assets/add-photo.png';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';

export const RegistrationScreen = ({ setRegisterData }) => {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const backAction = () => {
      return;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const hendlerSubmit = () => {
    onRegistrate();
    keyboardHide();
  };

  const onRegistrate = () => {
    if (login.length === 0 || email.length === 0 || password.length === 0) {
      Alert.alert('Ooops');
      return;
    }
    Alert.alert(
      'Credentials',
      `login: ${login}|` + ` Email: ${email}|. ` + ` Pass: ${password}`
    );
    setRegisterData({
      login,
      email,
      password,
    });
    setLogin('');
    setEmail('');
    setPassword('');
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView style={styles.keyboarBox}>
        <View
          style={[styles.wraper, { paddingBottom: isShowKeyboard ? 32 : 78 }]}
        >
          <View style={styles.photoInput}>
            <Image style={styles.addBtnPhoto} source={require(addPhoto)} />
          </View>
          <View style={styles.form}>
            <Text style={styles.title}>Реєстрація</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Логін"
                placeholderTextColor="#BDBDBD"
                value={login}
                onChangeText={(text) => setLogin(text)}
                onFocus={() => setIsShowKeyboard(true)}
                // onBlur={() => setIsShowKeyboard(false)}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Адрес электронной почты"
                placeholderTextColor="#BDBDBD"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
                onFocus={() => setIsShowKeyboard(true)}
              />
            </View>

            <View style={[styles.inputContainer, { marginBottom: 0 }]}>
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
                onFocus={() => setIsShowKeyboard(true)}
              />
              <Pressable onPress={handlePasswordVisibility}>
                <Text style={{ color: '#1B4371' }}>
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

            <TouchableOpacity activeOpacity={0.5} style={{ marginTop: 16 }}>
              <Text style={styles.toSingUp}>Вже є обліковий запис? Увійти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

// const styles = StyleSheet.create({
//   keyboarBox: {
//     width: '100%',
//   },
//   wraper: {
//     paddingTop: 92,
//     borderTopRightRadius: 25,
//     borderTopLeftRadius: 25,
//     backgroundColor: '#fff',
//   },

//   title: {
//     textAlign: 'center',
//     marginBottom: 32,
//     fontSize: 30,
//     fontWeight: '500',
//   },

//   photoInput: {
//     position: 'absolute',
//     top: 0,
//     left: '50%',
//     width: 120,
//     height: 120,
//     transform: [{ translateX: -60 }, { translateY: -60 }],
//     borderRadius: 16,
//     backgroundColor: '#F6F6F6',
//   },
//   addBtnPhoto: {
//     position: 'absolute',
//     right: 0,
//     bottom: 14,
//     width: 25,
//     height: 25,
//     transform: [{ translateX: 11 }],
//   },

//   inputContainer: {
//     borderWidth: 1,
//     height: 50,
//     paddingHorizontal: 16,
//     borderColor: '#F6F6F6',
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },

//   input: {
//     flex: 1,
//     paddingVertical: 15,
//     fontSize: 16,
//   },

//   form: {
//     marginHorizontal: 40,
//   },

//   btn: {
//     borderRadius: 100,
//     marginTop: 43,
//     paddingVertical: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FF6C00',
//   },

//   btnTitle: {
//     color: '#fff',
//     fontSize: 16,
//   },

//   toSingUp: {
//     textAlign: 'center',
//     color: '#1B4371',
//     fontSize: 16,
//   },
// });
