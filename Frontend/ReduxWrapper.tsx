import React from 'react'

import { UserContext } from './UserContext'
import { StripeProvider } from '@stripe/stripe-react-native'  

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Stacker from './src/navigations/Stacker'



const Stack=createNativeStackNavigator()

const STRIPE_KEY='pk_test_51P6pcYSCdNlkqtTKf1k30wMs98GFCxjtiGa8CfD7qfYqf2CqhA6ktkPi6gavaiaxwmScevN1lZGrIGpw7P57kLwo00H2QrdopU'

const ReduxWrapper = () => {
  return (
   <UserContext>
    <StripeProvider publishableKey={STRIPE_KEY}>
      <Stacker />
      {/* <Pay /> */}
    </StripeProvider>
   </UserContext>
/* <NavigationContainer>
  <Stack.Navigator screenOptions={{headerShown:false}}>
  <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='SignUp' component={SignUp} />
    <Stack.Screen name='Home' component={HomeScreen} />



  </Stack.Navigator>
</NavigationContainer>
   */
  )
}

export default ReduxWrapper

const styles = StyleSheet.create({})