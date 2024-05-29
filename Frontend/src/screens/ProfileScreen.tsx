import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBar from './HeaderBar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { clearUser } from '../redux/actions/authAction'

const ProfileScreen = () => {

  const {userId}=useSelector(state=>state.user)
  const route = useRoute();
  const {data} = route.params;
  const navigation=useNavigation();
  const dispatch=useDispatch()
 console.log(data,";;;")


 const handleLogout = async () => {
  await AsyncStorage.removeItem('authToken');
  dispatch(clearUser())
  navigation.navigate('Login');
};

 
  return (
    <View>
          <StatusBar backgroundColor={'#D77702'} />

          <HeaderBar title={"HomeScreen"} />

          <View style={{alignItems:'center',marginTop:30}}>

            <Image source={{uri:data.image}} style={{height:170,width:170,borderRadius:100}} />
            <Text style={{color:'black',fontSize:20,marginTop:20,fontWeight:'bold'}}>{data.name}</Text>

            <TouchableOpacity onPress={()=>handleLogout()}>
              <Text style={{color:"red",alignItems:'flex-end',}}>Log Out</Text>
            </TouchableOpacity>





          </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})

function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
