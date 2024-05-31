import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

// import {COLORS} from '../theme/theme';
// import CustomIcon from '../components/CustomIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import {BlurView} from '@react-native-community/blur';
import StackNavigator from './StackNavigator';
import PaymentScreen from '../screens/PaymentScreen';
import ActivityScreen from '../screens/PaymentScreen';
import GroupScreen from '../screens/GroupScreen';
import GroupNavigator from './GroupNavigator';
import ExpenseScreen from '../screens/ExpensesScreen';
import ExpenseNavigator from './ExpenseNavigator';
import ChatScreen from '../screens/ChatScreen';
import ExpensesScreen from '../screens/ExpensesScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  console.log('TAAABBBBBBBBBBBBBBBBBBB');

  const userId = useSelector(state => state.userId);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.tabBackground}
          />
        ),
      }}>
    
        <Tab.Screen
          name="Group"
          component={GroupScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <MaterialIcons
                name="groups"
                size={27}
                color={focused ? '#D77702' : '#52555A'}
              />
            ),
          }} />
        <Tab.Screen
          name="Stack"
          component={ChatScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <MaterialIcons
                name="person"
                size={30}
                color={focused ? '#D77702' : '#52555A'}
              />
            ),
          }} />
        <Tab.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <MaterialIcons
                name="payment"
                size={25}
                color={focused ? '#D77702' : '#52555A'}
              />
            ),
          }} />

        <Tab.Screen
          name="Expenses"
          component={ExpensesScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <MaterialIcons
                name="chat"
                size={25}
                color={focused ? '#D77702' : '#52555A'}
              />
            ),
          }} />
      
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(12,15,20,0.5)',
    height: 65,
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  tabBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default TabNavigator;
