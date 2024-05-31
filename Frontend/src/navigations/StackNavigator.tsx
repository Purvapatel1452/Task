import React from 'react'

import { StyleSheet, Text, View } from 'react-native'


import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import HomeScreen from '../screens/HomeScreen'
import FriendsScreen from '../screens/FriendsScreen'
import ChatScreen from '../screens/ChatScreen'
import ChatMessageScreen from '../screens/ChatMessageScreen'
import ExpenseScreen from '../screens/ExpenseScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Stack=createNativeStackNavigator()



const StackNavigator = () => {

  const userId=useSelector(state=>state.userId)

  return (

        <Stack.Navigator 
        screenOptions={{
          headerShown:false
        }}
        >
           <Stack.Screen 
            name='Chats' 
            component={ChatScreen}
             />
            
             <Stack.Screen 
            name='Home' 
            component={HomeScreen}
             />
              <Stack.Screen 
            name='Friends' 
            component={FriendsScreen}
             />
            
              <Stack.Screen 
            name='Messages' 
            component={ChatMessageScreen}
            options={({ route }) => ({
              tabBarVisible: route.state?.index === undefined || route.state.index === 0,
            })}
             />
             <Stack.Screen 
            name='Expense' 
            component={ExpenseScreen}
             />
             <Stack.Screen 
            name='Profile' 
            component={ProfileScreen}
             />
             

        </Stack.Navigator>
       
  
  )
}

export default StackNavigator

const styles = StyleSheet.create({})