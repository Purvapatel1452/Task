import React, {useEffect} from 'react';

import {StripeProvider} from '@stripe/stripe-react-native';

import {StyleSheet, Text, View} from 'react-native';

import AppStack from './src/navigations/stack/AppStack';
import {BASE_URL, STRIPE_KEY} from '@env';
import Chat from './src/screens/Chat';

// const STRIPE_KEY =
//   'pk_test_51P6pcYSCdNlkqtTKf1k30wMs98GFCxjtiGa8CfD7qfYqf2CqhA6ktkPi6gavaiaxwmScevN1lZGrIGpw7P57kLwo00H2QrdopU';

const App = () => {
  console.log(BASE_URL,">gd5y>>ferg>>>",STRIPE_KEY);

  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
      <AppStack />
    </StripeProvider>
    // <View>
    //   <Chat />
    // </View>
  );
};

export default App;

const styles = StyleSheet.create({});
