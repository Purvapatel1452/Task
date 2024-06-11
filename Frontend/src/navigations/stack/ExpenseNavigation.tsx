import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import ExpenseScreen from '../../screens/ExpenseScreen';
import ExpensesScreen from '../../screens/ExpensesScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { RootState } from '../../redux/store'; // Adjust the import based on your store setup

// Define the types for your navigation parameters
export type ExpenseStackParamList = {
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
const Stack = createNativeStackNavigator<ExpenseStackParamList>();

const ExpenseNavigation: React.FC = () => {
  // Use the RootState interface to type the useSelector hook
  const userId = useSelector((state: RootState) => state.auth.userId);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Expenses" component={ExpensesScreen} />
      <Stack.Screen name="Expense" component={ExpenseScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ExpenseNavigation;

const styles = StyleSheet.create({});










// import React from 'react'

// import { StyleSheet, Text, View } from 'react-native'


// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { useSelector } from 'react-redux'
// import ExpenseScreen from '../../screens/ExpenseScreen'
// import ExpensesScreen from '../../screens/ExpensesScreen'
// import ProfileScreen from '../../screens/ProfileScreen'


// const Stack=createNativeStackNavigator()


// const ExpenseNavigation = () => {
//   const userId = useSelector(state => state.userId);

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Expenses" component={ExpensesScreen} />

//       <Stack.Screen name="Expense" component={ExpenseScreen} />

//       <Stack.Screen name="Profile" component={ProfileScreen} />
//     </Stack.Navigator>
//   );
// };


// export default ExpenseNavigation

// const styles = StyleSheet.create({})