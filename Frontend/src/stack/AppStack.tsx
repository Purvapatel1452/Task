import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import { setUser } from '../redux/actions/authAction';

import AuthStack from './AuthStack';
import NavigationStack from './NavigationStack';






const AppStack = () => {

  

  const dispatch=useDispatch();

  const {userId}=useSelector(state=>state.user)
  const {token}=useSelector(state=>state.user)


  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          const [_, payloadBase64, __] = token.split('.');
          const decodedPayload = decode(payloadBase64);
          const decodedToken = JSON.parse(decodedPayload);
          // console.log("decodedToken" , decodedToken)
          const userid = decodedToken.userId;
          console.log('LOGI', userid);

          dispatch(setUser({userid,token}))
        
        } 
      } catch (err) {
        console.log('Error:', err);
      }
    };

    checkLogin();
  }, []);


  return (
    <NavigationContainer>
    {
      token && userId
      ?
      <NavigationStack />
      :
      <AuthStack />

    }
    </NavigationContainer>
  )
}

export default AppStack

const styles = StyleSheet.create({})