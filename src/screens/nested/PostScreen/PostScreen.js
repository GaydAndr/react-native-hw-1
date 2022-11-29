import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { IconButton } from './../../../components/IconButton';

export const PostScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

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
                  onPress={() => navigation.navigate('Comments')}
                >
                  <IconButton type="comment" />
                  <Text style={styles.text}>0</Text>
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
