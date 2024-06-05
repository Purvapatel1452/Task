import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useDebugValue, useEffect, useState } from 'react'

import { View, Text, StyleSheet,Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../redux/slices/usersSlice'



const ProfilePic = () => {
// const k=require('../assets/app_images/avata.png')
// const i=require('../assets/coffee_assets/liberica_coffee_beans/liberica_coffee_beans_square.png')

//   console.warn('p',i)

//   console.warn('j',k)

const navigation=useNavigation();

const dispatch=useDispatch()
const {userId}=useSelector(state=>state.auth)
const {details,loading,error}=useSelector((state)=>state.users)



// const userDetails=async()=>{

//   try{
// console.log(userId)
//     const response=await axios.get(`http://10.0.2.2:8000/chat/user/userDetails/${userId}`)

//     const res=response.data

//     setDetails(res)

//     console.log(res,"++++++++++++++++")


//   }
//   catch(error){
//     console.log("internal server error",error);
//   }

// }

useEffect(()=>{

  dispatch(fetchUserDetails(userId))


},[dispatch,userId])


if (loading) {
  return <ActivityIndicator size="large" color="#0000ff" />;
}

if (error) {
  return <Text>Error: {error}</Text>;
}


  return (<>
  <TouchableOpacity onPress={()=>navigation.navigate("Profile",{data:details})} >
    <View style={styles.ImageContainer}>
      <Image 
      source={require('../../assets/bg/bgImg.jpg')} 
      style={styles.Image}
      />
    </View>
    </TouchableOpacity>
    </>
  )
}

const styles=StyleSheet.create({
    ImageContainer:{
       height:36,
       width:36,
       borderRadius:12,
       borderColor:'black',
       borderWidth:2,
       alignItems:"center",
       justifyContent:"center",
       overflow:"hidden",
       shadowColor:'black',
       shadowOpacity:22,
       elevation:15
       

    },
    Image:{
        height:36,
        width:36
    }
})

export default ProfilePic