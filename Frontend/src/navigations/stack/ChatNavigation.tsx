import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import HomeScreen from '../../screens/HomeScreen';
import FriendsScreen from '../../screens/FriendsScreen';
import ChatScreen from '../../screens/ChatScreen';
import ChatMessageScreen from '../../screens/ChatMessageScreen';
import ExpenseScreen from '../../screens/ExpenseScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { RootState } from '../../redux/store'; // assuming you have a root reducer defined in store.ts
import UserProfileScreen from '../../screens/UserProfileScreen';

// Define the types for your navigation parameters
export type RootStackParamList = {
  Chats: undefined;
  Home: undefined;
  Friends: undefined;
  Messages: undefined;
  Expense: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ChatNavigation: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  return (
    <Stack.Navigator
      initialRouteName="Chats"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Chats" component={ChatScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen name="Messages" component={ChatMessageScreen} />
      {/* <Stack.Screen
        name="Messages"
        component={ChatMessageScreen}
        options={({ route }) => ({
          tabBarVisible:
            route.state?.index === undefined || route.state.index === 0,
        })}
      /> */}
      <Stack.Screen name="Expense" component={ExpenseScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigation;

const styles = StyleSheet.create({});













// import React from 'react'

// import { StyleSheet, Text, View } from 'react-native'


// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { useSelector } from 'react-redux'
// import HomeScreen from '../../screens/HomeScreen'
// import FriendsScreen from '../../screens/FriendsScreen'
// import ChatScreen from '../../screens/ChatScreen'
// import ChatMessageScreen from '../../screens/ChatMessageScreen'
// import ExpenseScreen from '../../screens/ExpenseScreen'
// import ProfileScreen from '../../screens/ProfileScreen'

// const Stack=createNativeStackNavigator()



// const ChatNavigation = () => {
//   const userId = useSelector(state => state.userId);

//   return (
//     <Stack.Navigator
//       initialRouteName="Chats"
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Chats" component={ChatScreen} />

//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Friends" component={FriendsScreen} />

//       <Stack.Screen
//         name="Messages"
//         component={ChatMessageScreen}
//         options={({route}) => ({
//           tabBarVisible:
//             route.state?.index === undefined || route.state.index === 0,
//         })}
//       />
//       <Stack.Screen name="Expense" component={ExpenseScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//     </Stack.Navigator>
//   );
// };

// export default ChatNavigation;

// const styles = StyleSheet.create({})