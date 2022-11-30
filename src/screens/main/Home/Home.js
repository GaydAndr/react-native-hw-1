import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { PostScreen } from './../../nested/PostScreen/PostScreen';
import { CommentsScreen } from './../../nested/CommentScreens/CommentsScreen';
import { MapScreen } from './../../nested/MapScreen/MapScreen';
import { IconButton } from './../../../components/IconButton';
import variables from '../../../../assets/variables';
import { authSignOutUser } from './../../../redux/auth/authOperations';
const { fontFamily, statusBarHeight } = variables;

const NestedScreen = createStackNavigator();

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSighOut = () => {
    dispatch(authSignOutUser());
  };
  const logOut = (navigation) => (
    <TouchableOpacity
      style={{
        padding: 10,
      }}
      onPress={handleSighOut}
    >
      <IconButton type="log-out" />
    </TouchableOpacity>
  );
  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
      }}
    >
      <NestedScreen.Screen
        name="Post"
        component={PostScreen}
        options={{
          header: ({ navigation, route, options }) => {
            return (
              <>
                <View style={styles.headerStyle}>
                  <View style={styles.headerContainer}>
                    <Text
                      style={[
                        styles.headerTitleStyle,
                        {
                          alignSelf: 'center',
                          marginLeft: 34,
                        },
                      ]}
                    >
                      Публікації
                    </Text>
                    {logOut()}
                  </View>
                </View>
              </>
            );
          },
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16, padding: 10 }}
              onPress={() => navigation.navigate('Post')}
            >
              <IconButton type="arrow-left" />
            </TouchableOpacity>
          ),

          title: 'Коментарии',
          headerStyle: {
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: '#212121',
            marginLeft: '35%',
          },
        }}
      />

      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={
          {
            // headerShown: false,
          }
        }
      />
    </NestedScreen.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    height: 44 + statusBarHeight,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  headerTitleStyle: {
    color: '#212121',
    textAlign: 'center',
    flex: 1,
    fontFamily: fontFamily.Medium,
    fontSize: 17,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 33,
    paddingHorizontal: 16,
    alignItems: 'baseline',
  },
});
