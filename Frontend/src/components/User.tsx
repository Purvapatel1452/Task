import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // assuming you have a root reducer defined in store.ts
import { checkFriendRequest, sendFriendRequest } from '../redux/slices/friendSlice';

interface UserProps {
  item: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
}

const User: React.FC<UserProps> = ({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const { userId } = useSelector((state: RootState) => state.auth);
  const { requestSent, loading, error } = useSelector((state: RootState) => state.friend);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
      console.log(requestSent, item.name);
    }, 3000);

    if (userId) {
      dispatch(checkFriendRequest({ userId, item }));

    }
  }, [dispatch, item, userId]);

  const sendFriendRequests = async () => {
    try {
      dispatch(sendFriendRequest({ currentUserId: userId, selectedUserId: item._id }));
      console.log(requestSent, '--------------', item.name);
    } catch (err) {
      console.log('Error in handling send Request', err);
    }
  };

  return (
    <Pressable style={styles.pressableContainer}>
      <View>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textName}>{item?.name}</Text>
        <Text style={styles.textEmail}>{item?.email}</Text>
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : requestSent ? (
        <Pressable
          style={styles.pressAddFrnd1}
          onPress={() => {
            console.log('request sent', userId);
            Alert.alert('Request Already Sent !!!');
          }}>
          <Text style={styles.textAdd1}>Request Sent</Text>
        </Pressable>
      ) : (
        <Pressable
          style={styles.pressAddFrnd}
          onPress={() => {
            console.log('request sent', userId);
            sendFriendRequests();
          }}>
          <Text style={styles.textAdd}>Add Friend</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  textName: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },
  textEmail: {
    color: 'gray',
    marginTop: 4,
  },
  pressAddFrnd: {
    backgroundColor: '#567189',
    padding: 10,
    borderRadius: 8,
    width: 105,
  },
  pressAddFrnd1: {
    backgroundColor: '#8BC34A',
    padding: 10,
    borderRadius: 8,
    width: 105,
  },
  textAdd: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
  },
  textAdd1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
  },
});
















// import React, {useContext, useEffect, useState} from 'react';

// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';

// import axios from 'axios';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   checkFriendRequest,
//   sendFriendRequest,
// } from '../redux/slices/friendSlice';
// import {current} from '@reduxjs/toolkit';

// const User = ({item}: any) => {
//   const dispatch = useDispatch();
//   const {userId} = useSelector(state => state.auth);
//   const {requestSent, loading, error} = useSelector(state => state.friend);

//   const [load, setLoad] = useState(true);

//   setTimeout(() => {
//     setLoad(false);
//     console.log(requestSent, item.name);
//   }, 3000);

//   // const [requestSent,setRequestSent]=useState(false)

//   // useEffect(() => {
//   //     const checkRequest = async () => {
//   //         try {
//   //             const response = await axios.get(`http://10.0.2.2:8000/chat/user/userDetails/${userId}`);
//   //             const currentUser = response.data;
//   //             console.log(currentUser)
//   //             // Check if the item._id exists in the sentFriendRequests array
//   //             const isRequestSent = currentUser.sentFriendRequests.includes(item._id);

//   //             setRequestSent(isRequestSent);
//   //         } catch (err) {
//   //             console.log('Error fetching user data', err);
//   //         }
//   //     };

//   //     checkRequest();
//   // }, []);
//   useEffect(() => {
//     if (userId) {
//       dispatch(checkFriendRequest({userId, item}));
//       console.log(requestSent, '::::::::;', item.name);
//     }

//     // Reset requestSent state when component unmounts
//     // return () => {
//     //   dispatch(resetRequestSent());
//     // };
//   }, []);

//   // const sendFriendRequest=async(currentUserId: any,selectedUserId: any)=>{

//   //     try{
//   //         console.log("current",currentUserId)
//   //         console.log("SELECT",selectedUserId)

//   //         // const response=await fetch("http://10.0.2.2:8000/friend-request",{
//   //         //     method:"POST",
//   //         //     headers:{
//   //         //         "ContentType":"application/json",
//   //         //     },
//   //         //     body:JSON.stringify({currentUserId,selectedUserId})
//   //         // })

//   //         const response=await axios.post("http://10.0.2.2:8000/chat/user/friend-request",{currentUserId,selectedUserId})
//   //         console.log("RES",response)
//   //         console.log("rrrr",response)

//   //         if(response){

//   //             setRequestSent(true)

//   //         }

//   //     }
//   //     catch(err){

//   //         console.log("Error in handling send Request",err)

//   //     }

//   // }

//   //    dispatch(sendFriendRequest({ currentUserId, selectedUserId }))

//   const sendFriendRequests = async ({userId}) => {
//     try {
//       dispatch(
//         sendFriendRequest({currentUserId: userId, selectedUserId: item._id}),
//       );
//       console.log(requestSent, '--------------', item.name);
//     } catch (err) {
//       console.log('Error in handling send Request', err);
//     }
//   };

//   return (
//     <Pressable style={styles.pressableContainer}>
//       <View>
//         <Image style={styles.image} source={{uri: item.image}} />
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.textName}>{item?.name}</Text>
//         <Text style={styles.textEmail}>{item?.email}</Text>
//       </View>

//       {load ? (
//         <ActivityIndicator />
//       ) : requestSent ? (
//         <Pressable
//           style={styles.pressAddFrnd1}
//           onPress={() => {
//             console.log('request sent', userId);
//             Alert.alert('Request Already Sent !!!');
//           }}>
//           <Text style={styles.textAdd1}>Request Sent</Text>
//         </Pressable>
//       ) : (
//         <Pressable
//           style={styles.pressAddFrnd}
//           onPress={() => {
//             console.log('request sent', userId);
//             sendFriendRequests({userId});
//           }}>
//           <Text style={styles.textAdd}>Add Friend</Text>
//         </Pressable>
//       )}
//     </Pressable>
//   );
// };

// export default User;

// const styles = StyleSheet.create({
//   pressableContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     resizeMode: 'cover',
//   },
//   textContainer: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   textName: {
//     fontWeight: 'bold',
//     color: 'black',
//     fontSize: 15,
//   },
//   textEmail: {
//     color: 'gray',
//     marginTop: 4,
//   },
//   pressAddFrnd: {
//     backgroundColor: '#567189',
//     padding: 10,
//     borderRadius: 8,
//     width: 105,
//   },
//   pressAddFrnd1: {
//     backgroundColor: '#8BC34A',
//     padding: 10,
//     borderRadius: 8,
//     width: 105,
//   },
//   textAdd: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 13,
//   },
//   textAdd1: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 13,
//   },
// });
