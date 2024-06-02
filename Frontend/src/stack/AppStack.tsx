import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import { login, setUser } from '../redux/slices/authSlice';

import AuthStack from './AuthStack';
import NavigationStack from './NavigationStack';






const AppStack = () => {

 

  const dispatch=useDispatch();

  const {userId}=useSelector(state=>state.auth)
  const {token}=useSelector(state=>state.auth)


  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          const [_, payloadBase64, __] = token.split('.');
          const decodedPayload = decode(payloadBase64);
          const decodedToken = JSON.parse(decodedPayload);
          // console.log("decodedToken" , decodedToken)
          const userId = decodedToken.userId;
          console.log('LOGI', userId);

          // dispatch(({userId,token}))
          
          dispatch(login.fulfilled({userId,token}))
         
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