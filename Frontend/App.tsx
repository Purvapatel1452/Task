// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// import ReduxWrapper from './ReduxWrapper'


// const App = () => {
//   return (
 
//       <ReduxWrapper />
  
//   )
// }

// export default App

// const styles = StyleSheet.create({})

import React from 'react'

import { StripeProvider } from '@stripe/stripe-react-native'  



import Stacker from './src/navigations/Stacker'
import { StyleSheet } from 'react-native'





const STRIPE_KEY='pk_test_51P6pcYSCdNlkqtTKf1k30wMs98GFCxjtiGa8CfD7qfYqf2CqhA6ktkPi6gavaiaxwmScevN1lZGrIGpw7P57kLwo00H2QrdopU'

const App = () => {
  return (
   
    <StripeProvider publishableKey={STRIPE_KEY}>
      <Stacker />
   
    </StripeProvider>
   

  )
}

export default App

const styles = StyleSheet.create({})


// <NavigationContainer>
// <Stack.Navigator screenOptions={{headerShown:false}}>
// <Stack.Screen name='Login' component={Login} />
//   <Stack.Screen name='SignUp' component={SignUp} />
//   <Stack.Screen name='Home' component={HomeScreen} />



// </Stack.Navigator>
// </NavigationContainer>
//  */

//GOOGLE PAY INTEGRATION


// import {PlatformPay, PlatformPayButton, StripeProvider, usePlatformPay} from '@stripe/stripe-react-native';
// import React from 'react'
// import { Alert } from 'react-native';

// const API_URL = 'http://10.0.2.2:3000';

// function App() {
//   const {
//     isPlatformPaySupported,
//     confirmPlatformPayPayment,
//   } = usePlatformPay();

//   React.useEffect(() => {
//     (async function () {
//       if (!(await isPlatformPaySupported({ googlePay: {testEnv: true} }))) {
//         Alert.alert('Google Pay is not supported.');
//         return;
//       }
//     })();
//   }, []);

//   const fetchPaymentIntentClientSecret = async () => {
//     // Fetch payment intent created on the server, see above
//     const response = await fetch(`http://192.168.0.119:8000/chat/payments/create-payment-intent`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         currency: 'usd',
//       }),
//     });
//     const { client_secret } = await response.json();
//     console.log(client_secret)

//     return client_secret;
//   };

//   const pay = async () => {
//     console.log("PAy")
//     const clientSecret = await fetchPaymentIntentClientSecret();

//     const { error } = await confirmPlatformPayPayment(
//       clientSecret,
//       {
//         googlePay: {
//           testEnv: true,
//           merchantName: 'My merchant name',
//           merchantCountryCode: 'US',
//           currencyCode: 'USD',
//           billingAddressConfig: {
//             format: PlatformPay.BillingAddressFormat.Full,
//             isPhoneNumberRequired: true,
//             isRequired: true,
//           },
//         },
//       }
//     );

//     if (error) {
//       Alert.alert(error.code, error.message);
//       // Update UI to prompt user to retry payment (and possibly another payment method)
//       return;
//     }
//     Alert.alert('Success', 'The payment was confirmed successfully.');
//   };

//   return (
//     <StripeProvider
//       publishableKey='pk_test_51P6pcYSCdNlkqtTKf1k30wMs98GFCxjtiGa8CfD7qfYqf2CqhA6ktkPi6gavaiaxwmScevN1lZGrIGpw7P57kLwo00H2QrdopU'
//     >
//       <PlatformPayButton
//         type={PlatformPay.ButtonType.Pay}
//         onPress={pay}
//         style={{
//           width: '100%',
//           height: 50,
//         }}
//       />
//     </StripeProvider>
//   );
// }

// export default App;