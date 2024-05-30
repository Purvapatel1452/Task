import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import TabNavigator from './TabNavigation'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import VerificationForm from '../screens/VerificationScreen'

import Nav from './Nav'

const Stack=createNativeStackNavigator()



const Stacker = () => {

  const userId=useSelector((state:any)=>state.userId)

  return (
    <NavigationContainer>
  
        <Stack.Navigator >
            <Stack.Screen 
            name='Login' 
            component={Login}
            options={{headerShown:false}} />
            <Stack.Screen 
            name='SignUp' 
            component={SignUp}
            options={{headerShown:false}} />
             <Stack.Screen 
            name='stack' 
            component={Nav}
            options={{headerShown:false}} />
           


            
        </Stack.Navigator>
        </NavigationContainer>
  
       
  
  )
}

export default Stacker

const styles = StyleSheet.create({})