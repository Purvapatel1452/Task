// firebaseConfig.js
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAPVcds8hSMM3D7NFeN4XgLwhW9T2ZPb9k",
  authDomain: "expense-hive-bbca0.firebaseapp.com",
  databaseURL: "https://expense-hive-bbca0-default-rtdb.firebaseio.com",
  projectId: "expense-hive-bbca0",
  storageBucket: "expense-hive-bbca0.appspot.com",
  messagingSenderId: "243588125513",
  appId: "1:243588125513:android:6dd3521b78e5e263c34098"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
