import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { IconButton } from './../../../components/IconButton';
import db from '../../../firebase/config';

export const PostScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  console.log('posts', posts);
  const [allComments, setAllComments] = useState([]);
  console.log('allComments', allComments);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection('posts')
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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

  useEffect(() => {
    getAllPost();
    getAllComments();
  }, []);

  const findId = (id) =>
    allComments.filter(({ postId }) => id === postId).length;

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  // console.log('posts', posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerPost}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.containerButton}>
              <View>
                <TouchableOpacity
                  style={styles.comentsButton}
                  onPress={() =>
                    navigation.navigate('Comments', {
                      postId: item.id,
                      photo: item.photo,
                    })
                  }
                >
                  <IconButton type="comment" />
                  <Text style={styles.text}>{findId(item.id)}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <IconButton type="map" />
                <TouchableOpacity
                  style={styles.locationButton}
                  onPress={() =>
                    navigation.navigate('Map', { location: item.location })
                  }
                >
                  <Text
                    style={{ ...styles.text, textDecorationLine: 'underline' }}
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
  );
};
