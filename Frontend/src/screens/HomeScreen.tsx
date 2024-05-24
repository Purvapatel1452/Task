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
  Button,
  Share,
  Linking,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setUsers} from '../redux/actions/homeActions';

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import {UserType} from '../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decode} from 'base-64';

import axios from 'axios';

import User from '../components/User';

// import {useStripe} from '@stripe/stripe-react-native';
import HeaderBar from './HeaderBar';

// import ChatBox from '../components/GroupIcon'

// import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  console.log('PNP');

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const user = useSelector(state => state.home.user);

  // const {initPaymentSheet, presentPaymentSheet} = useStripe();
  // const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
  //   useState('');



  // const onCheckout = async () => {
  //   // 1. Create a payment intent

  //   try {
  //     console.log('RE');
  //     const response = await fetch(
  //       'http://10.0.2.2:8000/chat/payments/intents',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'appplication/json',
  //         },
  //         body: JSON.stringify({amount: 100}),
  //       },
  //     );
  //     console.log('RE', response);
  //     const responseData = await response.json();

  //     console.log(response);

  //     if (!response.ok) {
  //       throw new Error('failed to create payment intent');
  //     }

  //     if (responseData.error) {
  //       Alert.alert('Something went wrong', responseData.error);
  //       return;
  //     }
  //     setPaymentIntentClientSecret(responseData.paymentIntent);

  //     // 2. Initialize the Payment sheet

  //     const {error: paymentSheetError} = await initPaymentSheet({
  //       merchantDisplayName: 'PATEL.PURVA',
  //       paymentIntentClientSecret: responseData.paymentIntent,
  //       defaultBillingDetails: {
  //         name: 'purva',
  //       },
  //     });

  //     if (paymentSheetError) {
  //       throw new Error(paymentSheetError.message);
  //     }

  //     // 3. Present the Payment Sheet from Stripe
  //     const {error: paymentError} = await presentPaymentSheet();

  //     if (paymentError) {
  //       throw new Error(paymentError.message);
  //     }
  //   } catch (err) {
  //     console.error('Error:', err.message);
  //     Alert.alert('error', err.message);
  //   }
  //   // 4. If payment ok -> create the order
  // };

  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);

  const [users, setUsers] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <Text style={styles.leftText}>Chat</Text>,
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Icon
            onPress={() => {
              navigation.navigate('Chats');
            }}
            name="chatbox-ellipses-outline"
            size={30}
            color="black"
          />
          <Icon
            onPress={() => {
              navigation.navigate('Friends');
            }}
            name="people-outline"
            size={30}
            color="black"
          />
        </View>
      ),
    });
  }, []);

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

  useEffect(() => {
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

    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          const [_, payloadBase64, __] = token.split('.');
          const decodedPayload = decode(payloadBase64);
          const decodedToken = JSON.parse(decodedPayload);
          // console.log("decodedToken" , decodedToken)
          const userId = decodedToken.userId;
          
          setUserId(userId);
          // console.log("DDFFRR",userId);

          await axios
            .get(`http://10.0.2.2:8000/chat/user/users/${userId}`)
            .then(response => {
              //  console.log("RESPONSE",response.data)
              setUsers(response.data);
            })
            .catch(err => {
              console.log('retreiving error', err);
            });
        } else {
          // Handle case when token is not available
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle error
      }
    };

    fetchUsers();
  }, []);

 

  return (
    <View>
      <HeaderBar title={'AddFriend'} />
      <View style={styles.userContainer}>
        {users.map((item: any, index: any) => (
          <User key={index} item={item} />
        ))}
      </View>
      <View>
        <Button title="requests" onPress={()=>navigation.navigate('Friends')} />
      </View>
    
 
  
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
});
