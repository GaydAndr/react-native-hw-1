import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCMQXhfUUl27gQm5JIVkkDjeb2XLnxrl8w',
  authDomain: 'react-native-app-c6b0a.firebaseapp.com',
  projectId: 'react-native-app-c6b0a',
  storageBucket: 'react-native-app-c6b0a.appspot.com',
  messagingSenderId: '108607892002',
  appId: '1:108607892002:web:92c9b82f4a16cb8a88387b',
};

// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);
export default db;
