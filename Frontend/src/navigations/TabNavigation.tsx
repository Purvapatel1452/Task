import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {BottomTabBar, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import ChatScreen from '../screens/ChatScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import NavigationStack from '../stack/NavigationStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QrScreen from '../screens/QrScreen';
import GroupChatScreen from '../screens/GroupChatScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ChatMessageScreen from '../screens/ChatMessageScreen';
import { useNavigationState } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:styles.tabBar,
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

const GroupNavigation = () => {
  const userId = useSelector(state => state.userId);

  const state = useNavigationState(state => state);
  const currentRoute = state.routes[state.index].name;

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="GroupScreen" component={GroupScreen}  />
      <Stack.Screen name="GroupChat" component={GroupChatScreen}  />
      <Stack.Screen name="Expenses" component={ExpensesScreen} />
      <Stack.Screen name="Expense" component={ExpenseScreen} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const ChatNavigation = () => {
  const userId = useSelector(state => state.userId);

  return (
    <Stack.Navigator
    initialRouteName='Chats'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Chats" component={ChatScreen} />

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Friends" component={FriendsScreen} />

      <Stack.Screen
        name="Messages"
        component={ChatMessageScreen}
        options={({route}) => ({
          tabBarVisible:
            route.state?.index === undefined || route.state.index === 0,
        })}
      />
      <Stack.Screen name="Expense" component={ExpenseScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const ExpenseNavigation = () => {
  const userId = useSelector(state => state.userId);

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

const styles = StyleSheet.create({
  tabBar: {
    // backgroundColor: 'rgba(12,15,20,0.5)',
    height: 65,
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
    backgroundColor:"white"

  },
  tabBackground: {
    position: 'relative',
    backgroundColor:'red'
    
  },
  hiddenTabBar: {
    display: 'none',
  },
});

export default TabNavigator;
