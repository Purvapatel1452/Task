import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../navigations/TabNavigation';
import ChatMessageScreen from '../screens/ChatMessageScreen';
import QrScreen from '../screens/QrScreen';
import ChatScreen from '../screens/ChatScreen';
import GroupChatScreen from '../screens/GroupChatScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GroupBox from '../components/GroupBox';
import GroupScreen from '../screens/GroupScreen';


const Stack=createNativeStackNavigator();


const NavigationStack = () => {


  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Tab" component={TabNavigator} />

    <Stack.Screen name="Qr" component={QrScreen} />
    
    <Stack.Screen name="Stack" component={ChatScreen} />
    
    <Stack.Screen name="GroupChat" component={GroupChatScreen} />

    <Stack.Screen name="Expense" component={ExpenseScreen} />

    <Stack.Screen name="Home" component={HomeScreen} />

    <Stack.Screen name="Friends" component={FriendsScreen} />

    <Stack.Screen name="Profile" component={ProfileScreen} />

    <Stack.Screen
      name="Messages"
      component={ChatMessageScreen}
      options={({route}) => ({
        tabBarVisible:
          route.state?.index === undefined || route.state.index === 0,
      })}
    />


  </Stack.Navigator>
  )
}

export default NavigationStack

const styles = StyleSheet.create({})