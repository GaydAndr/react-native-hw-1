import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export const CommentsScreen = ({ route, navigation }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);

  const date = new Date().toLocaleString();
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Image source={{ uri: item.avatarURL }} style={styles.image} />
              <Text>{item.comment}</Text>
              <Text>{item.date}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <TextInput
        style={{
          ...styles.input,
        }}
        value={comment}
        placeholder="Коментувати"
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.btn} activeOpacity={0.7}>
        <Text style={styles.btnTitle}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  comment: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 30,
    marginTop: 10,
  },
  btn: {
    marginTop: 40,
    width: '100%',
    padding: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderRadius: 8,
    marginTop: 16,
    paddingLeft: 16,
    height: 40,
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
