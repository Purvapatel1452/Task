import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'

import Login from '../screens/Login'
import SignUp from '../screens/SignUp'




const Stack=createNativeStackNavigator()



const AuthStack = () => {

  const userId=useSelector((state:any)=>state.userId)

  console.log(userId,"********")

  return (
   
  
        <Stack.Navigator >
            <Stack.Screen 
            name='Login' 
            component={Login}
            options={{headerShown:false}} />
            <Stack.Screen 
            name='SignUp' 
            component={SignUp}
            options={{headerShown:false}} />
             {/* <Stack.Screen 
            name='Stack' 
            component={NavigationStack}
            options={{headerShown:false}} /> */}
        </Stack.Navigator>
   
  
       
  
  )
}

export default AuthStack

const styles = StyleSheet.create({})