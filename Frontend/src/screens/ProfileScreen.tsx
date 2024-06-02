import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBar from './HeaderBar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { clearUser } from '../redux/slices/authSlice'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileScreen = () => {

  const {userId}=useSelector(state=>state.auth)
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
    <View style={styles.mainContainer}>
          <StatusBar backgroundColor={'#D77702'} />

          <HeaderBar title={"Profile"} />

          <View style={{alignItems:'center',marginTop:30}}>
<View style={styles.contentContainer}>
  <View style={styles.imageContainer}>
            <Image source={{uri:data.image}} style={styles.profileImage} />
            </View>
            <View style={{flexDirection:'row',gap:10}}>
             <Text style={styles.name}>{data.name}</Text>
            </View>
            <View style={{flexDirection:'row',gap:3}}>
            <MaterialCommunityIcons name='email' color='gray' size={20} style={{}} />
            <Text style={{fontSize:15}}>{data.email}</Text>
            </View>
            <View style={{flexDirection:'row',gap:5,marginTop:20}}>
            <FontAwesome name='mobile' color='gray' size={25} style={{}} />
            <Text style={{fontSize:18,color:'black'}}>{data.mobile}</Text>
            </View>
        
           
            </View>

            <TouchableOpacity onPress={()=>handleLogout()}>
            <View style={styles.logOutContainer}>
              <Text style={{color:"red", textAlign:'center',fontSize:20,fontWeight:'bold',elevation:2,shadowColor:'black',shadowOpacity:10}}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  mainContainer:{

    flex:1,
    

  },
  contentContainer:{
    justifyContent:'center',
    alignItems:'center'

  },
  profileImage:{
    height:170,
    width:170,
    borderRadius:100,
    borderWidth:1,
    borderColor:'gray',

  },
  imageContainer:{
    elevation:5,
    borderRadius:100,
    shadowOpacity:10,
    shadowColor:'black',

  },
  name:{
    color:'black',
    fontSize:30,
    marginTop:20,
    fontWeight:'bold'

  },
  logOutContainer:{
  marginTop:280,
  elevation:2,
  shadowColor:'black',
  shadowOpacity:10,
  borderWidth:2,
  padding:20,
  width:380,
  borderColor:'white',
  backgroundColor:'white',
  borderRadius:20
  
  },

})

