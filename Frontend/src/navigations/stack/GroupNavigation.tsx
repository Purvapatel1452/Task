import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { useNavigationState } from '@react-navigation/native';
import GroupScreen from '../../screens/GroupScreen';
import ExpensesScreen from '../../screens/ExpensesScreen';
import GroupChatScreen from '../../screens/GroupChatScreen';
import ExpenseScreen from '../../screens/ExpenseScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { RootState } from '../../redux/store'; // Adjust the import based on your store setup

// Define the types for your navigation parameters
export type GroupStackParamList = {
  GroupScreen: undefined;
  GroupChat: undefined;
  Expenses: undefined;
  Expense: undefined;
  Profile: undefined;
};

// Define the interface for the root state
interface RootState {
  auth: {
    userId: string;
  };
}

// Create the stack navigator with the parameter list type
const Stack = createNativeStackNavigator<GroupStackParamList>();

const GroupNavigation: React.FC = () => {
  // Use the RootState interface to type the useSelector hook
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Use the navigation state to determine the current route
  const state = useNavigationState(state => state);
  const currentRoute = state.routes[state.index].name;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GroupScreen" component={GroupScreen} />
      <Stack.Screen name="GroupChat" component={GroupChatScreen} />
      <Stack.Screen name="Expenses" component={ExpensesScreen} />
      <Stack.Screen name="Expense" component={ExpenseScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default GroupNavigation;

const styles = StyleSheet.create({});








// import React from 'react'

// import { StyleSheet, Text, View } from 'react-native'


// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { useSelector } from 'react-redux'


// import GroupScreen from '../../screens/GroupScreen'
// import ExpensesScreen from '../../screens/ExpensesScreen'
// import GroupChatScreen from '../../screens/GroupChatScreen'

// import QrScreen from '../../screens/QrScreen'
// import ExpenseScreen from '../../screens/ExpenseScreen'
// import ProfileScreen from '../../screens/ProfileScreen'
// import { useNavigationState } from '@react-navigation/native'

// const Stack=createNativeStackNavigator()



// const GroupNavigation = () => {
//   const userId = useSelector(state => state.userId);

//   const state = useNavigationState(state => state);
//   const currentRoute = state.routes[state.index].name;

//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="GroupScreen" component={GroupScreen} />
//       <Stack.Screen name="GroupChat" component={GroupChatScreen} />
//       <Stack.Screen name="Expenses" component={ExpensesScreen} />
//       <Stack.Screen name="Expense" component={ExpenseScreen} />

//       <Stack.Screen name="Profile" component={ProfileScreen} />
//     </Stack.Navigator>
//   );
// };

// export default GroupNavigation

// const styles = StyleSheet.create({})