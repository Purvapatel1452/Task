import React from 'react'

import { StyleSheet, Text, View } from 'react-native'


import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'


import GroupScreen from '../screens/GroupScreen'
import ExpensesScreen from '../screens/ExpensesScreen'
import GroupChatScreen from '../screens/GroupChatScreen'

import QrScreen from '../screens/QrScreen'
import ExpenseScreen from '../screens/ExpenseScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Stack=createNativeStackNavigator()



const GroupNavigator = () => {

  const userId=useSelector(state=>state.userId)

  return (

        <Stack.Navigator 
        screenOptions={{
          headerShown:false
        }}
        >
            
             <Stack.Screen 
            name='Groups' 
            component={GroupScreen}
             />
             <Stack.Screen 
            name='Qr' 
            component={QrScreen}
             />
            {/* <Stack.Screen 
            name='GroupBox' 
            component={GroupBox}
            
             /> */}
            <Stack.Screen 
            name='GroupChat' 
            component={GroupChatScreen}
             />
            <Stack.Screen 
            name='Expenses' 
            component={ExpensesScreen}
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

export default GroupNavigator

const styles = StyleSheet.create({})