import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatMessageScreen from '../screens/ChatMessageScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import QrScreen from '../screens/QrScreen';
import GroupChatScreen from '../screens/GroupChatScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import TabNavigator from './TabNavigation';
import ProfileScreen from '../screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import GroupScreen from '../screens/GroupScreen';

const Stack = createNativeStackNavigator();

const GroupChat=createNativeStackNavigator()

const Nav = () => {
  const {userId}=useSelector(state=>state.user)

  console.log("TABBBBBBBBB",userId)


  return (
   
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tab" component={TabNavigator} />

      <Stack.Screen name="Qr" component={QrScreen} />

      <Stack.Screen name="GroupChat" component={GroupChatScreen} />

      <Stack.Screen name="Expense" component={ExpenseScreen} />

      <Stack.Screen name="Chats" component={ChatScreen} />

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
   
  );
};

export default Nav;

const styles = StyleSheet.create({});
