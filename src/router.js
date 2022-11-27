import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { RegistrationScreen } from './screens/auth/RegistrationScreen/RegistrationScreen';
import { LoginScreen } from './screens/auth/LoginScreen/LoginScreen';
import { PostScreen } from './screens/main/PostScreen/PostScreen';
import { CreateScreen } from './screens/main/CreateScreen/CreateScreen';
import { ProfileScreen } from './screens/main/ProfileScreen/ProfileScreen';
import variables from '../assets/variables';
import { IconButton } from './components/IconButton';

const statusBarHeight = StatusBar.currentHeight;

const { fontFamily, fontSize, color } = variables;

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const logOut = () => (
  <TouchableOpacity
    style={{
      marginRight: 16,
      padding: 10,
    }}
  >
    <IconButton type="log-out" />
  </TouchableOpacity>
);

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
          setRegisterData={123}
        />
        <AuthStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: 'rgba(0, 0, 0, 0.2)',
            height: 83,
            paddingTop: 9,
            paddingBottom: 22,
          },
          null,
        ],
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          height: 44 + statusBarHeight,
          borderBottomColor: 'rgba(0, 0, 0, 0.2)',
          // flex: 1,
          // justifyContent: 'center',
          // alignContent: 'center',
          // alignItems: 'center',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#212121',
          textAlign: 'center',
          // marginLeft: '50%',
          // width: 100,

          fontFamily: fontFamily.Medium,
          fontSize: 17,
        },
      }}
    >
      <MainTab.Screen
        name="Post"
        component={PostScreen}
        options={{
          title: 'Публікації',
          headerRight: () => logOut(),
          // headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[focused ? styles.bottomButton : styles.bottomButton2]}
            >
              <Ionicons
                name="grid-outline"
                size={size}
                color={focused ? '#fff' : 'rgba(33, 33, 33, 0.8)'}
              />
            </View>
          ),
        }}
      ></MainTab.Screen>
      <MainTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          title: 'Створити публікацію',
          // headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[focused ? styles.bottomButton : styles.bottomButton2]}
            >
              <AntDesign
                name="plus"
                size={size}
                color={focused ? '#fff' : 'rgba(33, 33, 33, 0.8)'}
              />
            </View>
          ),
        }}
      ></MainTab.Screen>
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // headerShown: false,
          headerRight: () => logOut(),
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[focused ? styles.bottomButton : styles.bottomButton2]}
            >
              <Feather
                name="user"
                size={size}
                color={focused ? '#fff' : 'rgba(33, 33, 33, 0.8)'}
              />
            </View>
          ),
        }}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: '#FF6C00',
    borderRadius: 20,
    padding: 7,
    width: 70,
    marginTop: 9,
    alignItems: 'center',
  },
  bottomButton2: {
    padding: 7,
    width: 70,
    marginTop: 9,
    alignItems: 'center',
  },
});
