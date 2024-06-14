import React, {
  useLayoutEffect,
  useContext,
  useEffect,
  useState,
  useId,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';


import {useNavigation} from '@react-navigation/native';


import User from '../components/User';

// import {useStripe} from '@stripe/stripe-react-native';
import HeaderBar from '../components/HeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchUsers } from '../redux/slices/usersSlice';

// import ChatBox from '../components/GroupIcon'

// import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  console.log('PNP');



  const dispatch = useDispatch();


  const {userId}=useSelector(state=>state.auth)



  const {users,loading,error}=useSelector((state)=>state.users)


  useEffect(() => {
    if(userId){
      console.log(":::::::::::")
      dispatch(fetchUsers(userId))
      console.log(users,":>>>>>>")
    
    }
    
    console.log(users,"::::::::::::::;")
       
        
      },[dispatch,userId]);


  const navigation = useNavigation();

  

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: '',
  //     headerLeft: () => <Text style={styles.leftText}>Chat</Text>,
  //     headerRight: () => (
  //       <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
  //         <Icon
  //           onPress={() => {
  //             navigation.navigate('Chat');
  //           }}
  //           name="chatbox-ellipses-outline"
  //           size={30}
  //           color="black"
  //         />
  //         <Icon
  //           onPress={() => {
  //             navigation.navigate('Friends');
  //           }}
  //           name="people-outline"
  //           size={30}
  //           color="black"
  //         />
  //       </View>
  //     ),
  //   });
  // }, []);

  //   const handlePress = async () => {
  //     // Checking if the link is supported
  //     console.log("PREss")
  //     const url="whatsapp://app"
  //     console.log(url)
  //     const supported = await Linking.openURL(url);
  // console.log(supported)
  //     if (supported) {
  //       // Opening the link
  //       await Linking.openURL(url);

  //     } else {
  //       Alert.alert(`Don't know how to open this URL: ${url}`);

  //     }
  //   };

  // const handlePress =  async() => {
  //   const url = 'http://whatsapp://app';
  //   try {
  //     const supported = Linking.canOpenURL(url);
  //     if (await supported) {
  //        Linking.openURL(url);
  //     } else {
  //       console.log("Unsupported URL: ", url);
  //     }
  //   } catch (error) {
  //     console.error("Error opening URL: ", error);
  //   }
  // };

  // useEffect(() => {
  //   //   const fetchUsers=async()=>{

  //   //     const token=await AsyncStorage.getItem('authToken')
  //   //     console.log("TOKEN:",token)

  //   //     const decodedToken:any = jwtDecode(token);
  //   //     console.log("DECODED",decodedToken);

  //   //     const userId=decodedToken.userId;
  //   //     console.log("USERID",userId);

  //   //     setUserId(userId)

  //   //     axios.get(`http://192.168.2.122:8000/users/${userId}`)
  //   //     .then((response)=>{
  //   //       setUsers(response.data)

  //   //     })
  //   //     .catch((err)=>{
  //   //       console.log("retreiving error",err)
  //   //     })

  //   // }

  //   const fetchUsers = async () => {
  //     try {
        

  //         await axios
  //           .get(`http://10.0.2.2:8000/chat/user/users/${userId}`)
  //           .then(response => {
  //              console.log("RESPONSE",response.data)
  //             setUsers(response.data);
              
  //           })
  //           .catch(err => {
  //             console.log('retreiving error', err);
  //           });
        
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //       // Handle error
  //     }
  //   };

  //   fetchUsers();
  // }, []);



    //   const fetchUsers=async()=>{

    //     const token=await AsyncStorage.getItem('authToken')
    //     console.log("TOKEN:",token)

    //     const decodedToken:any = jwtDecode(token);
    //     console.log("DECODED",decodedToken);

    //     const userId=decodedToken.userId;
    //     console.log("USERID",userId);

    //     setUserId(userId)

    //     axios.get(`http://192.168.2.122:8000/users/${userId}`)
    //     .then((response)=>{
    //       setUsers(response.data)

    //     })
    //     .catch((err)=>{
    //       console.log("retreiving error",err)
    //     })

    // }

  




  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text>Error: {error}</Text>
  //     </View>
  //   );
  // }
 

  return (
    <View style={{flex:1}}>
      <HeaderBar title={'AddFriends'} />

   
      <ScrollView>
       
      <View style={styles.userContainer}>

        {
        loading ?
        <ActivityIndicator />
        :
        error ?
        <Text>Error: {error}</Text>
        :
        
      
        (users.map((item: any, index: any) => (
          <User key={index} item={item} />
        )))
        }
      </View>
      </ScrollView>

     

      <TouchableOpacity 
       style={{position:'relative'}}
       onPress={()=>navigation.navigate('Friends')} 
       >
        <View style={styles.buttonContainer2}>
         <MaterialIcons name='notifications-active' size={25} color={'white'} />
         </View>
       </TouchableOpacity>
    
 
  
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  leftText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  userContainer: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer2: {
    position: 'absolute',
    bottom: 80,
    left:20,
    backgroundColor: '#D77702',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 8,

  },
});
