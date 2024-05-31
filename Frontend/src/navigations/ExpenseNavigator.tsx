import React from 'react'

import { StyleSheet, Text, View } from 'react-native'


import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import ExpenseScreen from '../screens/ExpenseScreen'
import ExpensesScreen from '../screens/ExpensesScreen'
import ProfileScreen from '../screens/ProfileScreen'


const Stack=createNativeStackNavigator()



const ExpenseNavigator = () => {

  const userId=useSelector(state=>state.userId)

  return (

        <Stack.Navigator 
        screenOptions={{
          headerShown:false
        }}
        >
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

export default ExpenseNavigator

const styles = StyleSheet.create({})