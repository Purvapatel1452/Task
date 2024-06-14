import React, { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../redux/slices/usersSlice';
import { RootState } from '../redux/store'; // assuming you have a root reducer defined in store.ts
import { BASE_URL } from '@env';

interface UserDetails {
  image: string;
  // Add other properties if necessary
}

const ProfilePic: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.auth);
  const { details, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUserDetails(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <ActivityIndicator size="small" color="silver" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile', { data: details })}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: details.image }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};


const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  imageContainer: {
    height: height * 0.038,
    width: height * 0.037,
    borderRadius: 12,
    borderColor: 'silver',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 10,
    elevation: 5,
  },
  image: {
    height: 36,
    width: 36,
  },
});

export default ProfilePic;



















// import {useNavigation} from '@react-navigation/native';
// import axios from 'axios';
// import React, {useDebugValue, useEffect, useState} from 'react';

// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchUserDetails} from '../redux/slices/usersSlice';
// import {BASE_URL} from '@env';

// const ProfilePic = () => {
//   const navigation = useNavigation();
//   console.log(BASE_URL, '{{{');

//   const dispatch = useDispatch();
//   const {userId} = useSelector(state => state.auth);
//   const {details, loading, error} = useSelector(state => state.users);

//   useEffect(() => {
//     dispatch(fetchUserDetails(userId));
//   }, [dispatch, userId]);

//   if (loading) {
//     return <ActivityIndicator size="small" color="silver" />;
//   }

//   if (error) {
//     return <Text>Error: {error}</Text>;
//   }

//   return (
//     <>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('Profile', {data: details})}>
//         <View style={styles.ImageContainer}>
//           <Image source={{uri: details.image}} style={styles.Image} />
//         </View>
//       </TouchableOpacity>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   ImageContainer: {
//     height: 36,
//     width: 36,
//     borderRadius: 12,
//     borderColor: 'black',
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//     shadowColor: 'black',
//     shadowOpacity: 10,
//     elevation: 5,
//   },
//   Image: {
//     height: 36,
//     width: 36,
//   },
// });

// export default ProfilePic;
