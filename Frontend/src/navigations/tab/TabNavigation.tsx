import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {BlurView} from '@react-native-community/blur';

import PaymentScreen from '../../screens/PaymentScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GroupNavigation from '../stack/GroupNavigation';
import ChatNavigation from '../stack/ChatNavigation';
import ExpenseNavigation from '../stack/ExpenseNavigation';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
        name="GroupNavigation"
        component={GroupNavigation}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons
              name="groups"
              size={30}
              color={focused ? '#D77702' : '#52555A'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatNavigation"
        component={ChatNavigation}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons
              name="person"
              size={30}
              color={focused ? '#D77702' : '#52555A'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ExpenseNavigation"
        component={ExpenseNavigation}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons
              name="event-note"
              size={27}
              color={focused ? '#D77702' : '#52555A'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons
              name="payment"
              size={27}
              color={focused ? '#D77702' : '#52555A'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
    backgroundColor: 'white',
  },
  tabBackground: {
    position: 'relative',
    backgroundColor: 'red',
  },
  hiddenTabBar: {
    display: 'none',
  },
});

export default TabNavigator;
