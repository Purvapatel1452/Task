import { Alert, Button, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderBar from './HeaderBar'
import { PlatformPay, PlatformPayButton, confirmPlatformPayPayment, useStripe } from '@stripe/stripe-react-native';





  

const PaymentScreen = () => {
  
const {initPaymentSheet, presentPaymentSheet} = useStripe();
const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState('');

const [url,setUrl]=useState('')

const onCheckout = async () => {
  // 1. Create a payment intent

  try {
    console.log('RE');
    const response = await fetch(
      'http://10.0.2.2:8000/chat/payments/intents',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'appplication/json',
        },
        body: JSON.stringify({amount: 100}),
      },
    );
    console.log('RE', response);
    const responseData = await response.json();

    console.log("))",responseData,"((||||");

    if (!response.ok) {
      throw new Error('failed to create payment intent');
    }

    if (responseData.error) {
      Alert.alert('Something went wrong', responseData.error);
      return;
    }
    setPaymentIntentClientSecret(responseData.paymentIntent);

    // 2. Initialize the Payment sheet

    const {error: paymentSheetError} = await initPaymentSheet({
      merchantDisplayName: 'PATEL.PURVA',
      paymentIntentClientSecret: responseData.paymentIntent,
      defaultBillingDetails: {
        name: 'purva',
      },
    });

    if (paymentSheetError) {
      throw new Error(paymentSheetError.message);
    }

    // 3. Present the Payment Sheet from Stripe
    const {error: paymentError} = await presentPaymentSheet();

    if (paymentError) {
      throw new Error(paymentError.message);
    }
  } catch (err) {
    console.error('Error:', err.message);
    Alert.alert('error', err.message);
  }
  // 4. If payment ok -> create the order
};


const fetchPaymentIntentClientSecret = async () => {
      // Fetch payment intent created on the server, see above
      const response = await fetch(`http://10.0.2.2:8000/chat/payments/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: 'usd',
        }),
      });
      const { client_secret } = await response.json();
      console.log(client_secret)
  
      return client_secret;
    };


const pay = async () => {
      console.log("PAy")
      const clientSecret = await fetchPaymentIntentClientSecret();
  
      const { error } = await confirmPlatformPayPayment(
        clientSecret,
        {
          googlePay: {
            testEnv: true,
            merchantName: 'My merchant name',
            merchantCountryCode: 'US',
            currencyCode: 'USD',
            billingAddressConfig: {
              format: PlatformPay.BillingAddressFormat.Full,
              isPhoneNumberRequired: true,
              isRequired: true,
            },
          },
        }
      );
  
      if (error) {
        Alert.alert(error.code, error.message);
        // Update UI to prompt user to retry payment (and possibly another payment method)
        return;
      }
      Alert.alert('Success', 'The payment was confirmed successfully.');
    };


    const openURL = (url: string) => {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log(`Don't know how to open URI: ${url}`);
          }
        })
        .catch((err) => console.error('An error occurred', err));
    };


  return (
    <View>
    <View>
      <HeaderBar title={'AddFriend'} />
    </View>
      <View>
        <Button title="PAY" onPress={()=>onCheckout()} />
      </View>
      <PlatformPayButton
        type={PlatformPay.ButtonType.Pay}
        onPress={pay}
        style={{
          width: '100%',
          height: 50,
        }}
      />

<View>
      <Button title="Open URL" onPress={() => openURL('https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xUDZwY1lTQ2RObGtxdFRLKPi6trIGMgZz7cl9ITU6LBatqi5fCbFmNmdYjD0UeD67NHA8giszINUztDY-UBIdjqIyP-58naK3BCOc')} />
    </View>
   </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({})