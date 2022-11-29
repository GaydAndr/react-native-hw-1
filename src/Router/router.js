import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { RegistrationScreen } from '../screens/auth/RegistrationScreen/RegistrationScreen';
import { LoginScreen } from '../screens/auth/LoginScreen/LoginScreen';
import { HomeScreen } from '../screens/main/Home/Home';
import { CreateScreen } from '../screens/main/CreateScreen/CreateScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen/ProfileScreen';
import { IconButton } from '../components/IconButton';
import styles from './styles';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const logOut = (navigation) => (
  <TouchableOpacity
    style={{
      padding: 10,
    }}
  >
    <IconButton type="log-out" />
  </TouchableOpacity>
);

const goToHome = (navigation) => (
  <TouchableOpacity
    style={{
      marginTop: 9,
      height: 35,
      width: 35,
    }}
    onPress={() => navigation.navigate('Home')}
  >
    <IconButton type="arrow-left" />
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

        tabBarStyle: styles.tabBarStyle,

        headerStyle: styles.headerStyle,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitleStyle,
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({
          tapBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'Comments';
            console.log(routeName);
            if (routeName === 'Comments') {
              console.log(123);
              return { display: 'none' };
            }
            return;
          })(route),
          headerShown: false,
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
        })}
      />
      <MainTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          title: 'Створити публікацію',
          header: ({ navigation, route, options }) => {
            return (
              <>
                <View style={options.headerStyle}>
                  <View style={styles.headerContainer}>
                    {goToHome(navigation)}
                    <Text
                      style={[
                        options.headerTitleStyle,
                        {
                          alignSelf: 'center',
                          marginRight: 34,
                        },
                      ]}
                    >
                      {options.title}
                    </Text>
                  </View>
                </View>
              </>
            );
          },
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
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          header: ({ navigation, route, options }) => {
            return (
              <>
                <View style={options.headerStyle}>
                  <View style={styles.headerContainer}>
                    {goToHome(navigation)}
                    <Text
                      style={[
                        options.headerTitleStyle,
                        {
                          alignSelf: 'center',
                        },
                      ]}
                    >
                      {options.title}
                    </Text>
                    {logOut()}
                  </View>
                </View>
              </>
            );
          },
          tapBarStyle: { backgroundColor: '#f5f' },
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
      />
    </MainTab.Navigator>
  );
};
