import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from './../../../components/IconButton';
import { authSignOutUser } from './../../../redux/auth/authOperations';
import db from '../../../firebase/config';

import * as ImagePicker from 'expo-image-picker';

export const ProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [userPosts, setUserPosts] = useState([]);
  const [allComments, setAllComments] = useState([]);
  console.log('userPosts', userPosts);
  const { userId } = useSelector((state) => state.auth);
  const { avatarURL } = useSelector((state) => state.auth);
  console.log(avatarURL);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getUserPosts();
    getAllComments();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection('posts')
      .where('userId', '==', userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  const getAllComments = async () => {
    await db
      .firestore()
      .collection('comments')
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  const findId = (id) =>
    allComments.filter(({ postId }) => id === postId).length;

  const signOut = () => {
    dispatch(authSignOutUser());
    console.log(authSignOutUser());
  };

  const addAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
    });
    console.log('result', result);

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require('./../../../../assets/Screens/auth-bg-photo.jpg')}
      >
        <SafeAreaView>
          <ScrollView>
            <View style={styles.headerContainer}>
              <View style={styles.avatarWrapper}>
                <View style={styles.avatar}>
                  <View style={styles.avatar}>
                    <Image source={{ uri: avatarURL }} style={styles.header} />
                  </View>
                </View>
                <TouchableOpacity onPress={signOut} style={styles.logOutIcon}>
                  <IconButton type="log-out" onPress={signOut} />
                </TouchableOpacity>
              </View>
              <View style={styles.innerBoxTextWrap}>
                <Text style={styles.innerBoxText}>
                  {userPosts[0]?.nickName}
                </Text>
              </View>
            </View>
            <View style={styles.innerBox}>
              <FlatList
                data={userPosts}
                keyExtractor={(item, indx) => indx.toString()}
                renderItem={({ item }) => (
                  <View style={styles.postContainer}>
                    <Image source={{ uri: item.photo }} style={styles.image} />
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={styles.btnContainer}>
                      <View style={{ flexDirection: 'row' }}>
                        <IconButton type="comment" />
                        <TouchableOpacity
                          style={styles.btnComents}
                          onPress={() =>
                            navigation.navigate('Comments', { postId: item.id })
                          }
                        >
                          {console.log('item.id', item.id)}
                          <Text style={styles.text}>{findId(item.id)}</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <IconButton type="map" />
                        <TouchableOpacity
                          style={styles.btnLocation}
                          onPress={() =>
                            navigation.navigate('Map', {
                              location: item.location,
                            })
                          }
                        >
                          <Text
                            style={{
                              ...styles.text,
                              textDecorationLine: 'underline',
                            }}
                          >
                            {item.locationName}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    zIndex: 2,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerBox: {
    marginTop: -110,

    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 130,
  },
  logOutIcon: {
    position: 'absolute',
    padding: 10,
    right: '3.5%',
    marginTop: 10,
    backgroundColor: '#fff',
  },
  innerBoxText: {
    marginTop: 16,
    fontSize: 30,
    lineHeight: 35,
    color: '#212121',
    textAlign: 'center',
  },
  innerBoxTextWrap: {},
  postContainer: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    width: 375,
    height: 200,
    borderRadius: 8,
  },
  header: {
    position: 'absolute',

    borderRadius: 16,
    width: 120,
    height: 120,
  },
  headerImg: {
    borderWidth: 1,
    backgroundColor: '#FFF',
    padding: 6,
    borderColor: '#FF6C00',
    borderRadius: 100,
    position: 'absolute',
    right: -10,
    bottom: 13,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 3,
    color: '#212121',
  },
  postContainer: {
    marginBottom: 10,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    position: 'relative',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
});
