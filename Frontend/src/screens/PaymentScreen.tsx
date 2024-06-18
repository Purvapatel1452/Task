import React, { useState, useEffect } from 'react';
import { Alert, Button, Linking, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PlatformPay, PlatformPayButton, confirmPlatformPayPayment, useStripe } from '@stripe/stripe-react-native';
import HeaderBar from '../components/HeaderBar';
import { createPaymentIntent, fetchPaymentIntent } from '../redux/slices/paymentSlice';
import { updateUserSubscription } from '../redux/slices/subscriptionSlice';

const PaymentScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState(null); // to track the selected subscription plan
  const dispatch = useDispatch();
  const {userId}=useSelector(state=>state.auth)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { paymentIntentClientSecret, loading: paymentLoading, error: paymentError } = useSelector(state => state.payment);
  const { subscription, loading: subscriptionLoading, error: subscriptionError } = useSelector(state => state.sub);

  const plans = [
    { type: 'Monthly', price: 99 },
    { type: 'Quarterly', price: 199 },
    { type: 'Yearly', price: 699 }
  ];

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscription = async () => {
    if (!selectedPlan) {
      Alert.alert('Error', 'Please select a subscription plan.');
      return;
    }

    try {

      await dispatch(fetchPaymentIntent({ amount: selectedPlan.price * 100 }));

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret,
        merchantDisplayName: 'Your Company',
        defaultBillingDetails: { name: 'Customer Name' },
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) {
        Alert.alert('Error', paymentError.message);
      } else {
        Alert.alert('Success', 'Payment successful');
        console.log("SUUNNBB")
        dispatch(updateUserSubscription({ userId, subscriptionType: selectedPlan.type }));
      }
    } catch (err) {
      console.error('Payment error:', err);
      Alert.alert('Error', err.message);
    }
  };

  const handlePlatformPay = async () => {
    if (!selectedPlan) {
      Alert.alert('Error', 'Please select a subscription plan.');
      return;
    }

    try {
      await dispatch(createPaymentIntent({ amount: selectedPlan.price * 100 }));

      const { error } = await confirmPlatformPayPayment(paymentIntentClientSecret, {
        googlePay: {
          testEnv: true,
          merchantName: 'Your Company',
          merchantCountryCode: 'INR',
          currencyCode: 'INR',
          billingAddressConfig: {
            format: 'FULL',
            isPhoneNumberRequired: true,
            isRequired: true,
          },
        },
      });

      if (error) {
        Alert.alert(error.code, error.message);
      } else {
        Alert.alert('Success', 'The payment was confirmed successfully.');
        dispatch(updateUserSubscription({ userId, subscriptionType: selectedPlan.type }));
      }
    } catch (err) {
      console.error('Platform Pay error:', err);
      Alert.alert('Error', err.message);
    }
  };

  const openURL = (url) => {
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

  return (<>
    <HeaderBar title="Subscription" />
    <View style={styles.container}>
    

      <ScrollView contentContainerStyle={styles.scrollView}>
        {plans.map((plan) => (
          <Pressable
            key={plan.type}
            style={[styles.subscriptionCard, selectedPlan?.type === plan.type && styles.selectedSubscriptionCard]}
            onPress={() => handlePlanSelection(plan)}
          >
            <Text style={styles.subscriptionCardType}>{plan.type} Plan</Text>
            <Text style={styles.subscriptionCardPrice}>${plan.price}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="PAY" onPress={handleSubscription} disabled={paymentLoading || subscriptionLoading} />
        <PlatformPayButton
           type={PlatformPay.ButtonType.Pay}
          onPress={handlePlatformPay}
          style={styles.platformPayButton}
        />
        <Button title="Open URL" onPress={() => openURL('https://pay.stripe.com/receipts/payment/your_payment_id')} />
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 10,
  },
  subscriptionCard: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedSubscriptionCard: {
    backgroundColor: '#d5e8d4',
  },
  subscriptionCardType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subscriptionCardPrice: {
    fontSize: 16,
    color: '#888',
  },
  buttonContainer: {
    marginTop: 20,
  },
  platformPayButton: {
    width: '100%',
    height: 50,
    marginTop: 10,
  },
});

export default PaymentScreen;



















// import { Alert, Button, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import HeaderBar from '../components/HeaderBar'
// import { PlatformPay, PlatformPayButton, confirmPlatformPayPayment, useStripe } from '@stripe/stripe-react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { createPaymentIntent, fetchPaymentIntent } from '../redux/slices/paymentSlice';





  

// const PaymentScreen = () => {
  
// const {initPaymentSheet, presentPaymentSheet} = useStripe();
// // const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState('');


// const dispatch = useDispatch();
// const { paymentIntentClientSecret, loading, error } = useSelector((state) => state.payment);



// const [url,setUrl]=useState('')




// const onCheckout = async () => {


//   try {
   
//     dispatch(fetchPaymentIntent())
//     .then(async (resultAction) => {
//       if (fetchPaymentIntent.fulfilled.match(resultAction)) {
//         const { error: paymentSheetError } = await initPaymentSheet({
//           merchantDisplayName: 'PATEL.PURVA',
//           paymentIntentClientSecret: resultAction.payload,
//           defaultBillingDetails: { name: 'purva' },
//         });

//         if (paymentSheetError) {
//           Alert.alert('Error', paymentSheetError.message);
//           return;
//         }

//         const { error: paymentError } = await presentPaymentSheet();

//         if (paymentError) {
//           Alert.alert('Error', paymentError.message);
//         } else {
//           Alert.alert('Success', 'Payment successful');
//         }
//       } else {
//         Alert.alert('Error', resultAction.payload);
//       }
//     });

   
//   } catch (err) {
//     console.error('Error:', err.message);
//     Alert.alert('error', err.message);
//   }

// };


// const pay = async () => {
  

//   dispatch(createPaymentIntent())
//   .then(async (resultAction) => {
//     if (createPaymentIntent.fulfilled.match(resultAction)) {
//       const { error } = await confirmPlatformPayPayment(resultAction.payload, {
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
//       });

//       if (error) {
//         Alert.alert(error.code, error.message);
//       } else {
//         Alert.alert('Success', 'The payment was confirmed successfully.');
//       }
//     } else {
//       Alert.alert('Error', resultAction.payload);
//     }
//   });
// };

 


//     const openURL = (url: string) => {
//       Linking.canOpenURL(url)
//         .then((supported) => {
//           if (supported) {
//             Linking.openURL(url);
//           } else {
//             console.log(`Don't know how to open URI: ${url}`);
//           }
//         })
//         .catch((err) => console.error('An error occurred', err));
//     };


//   return (
//     <View>
//     <View>
//     <ScrollView style={{marginTop: 30}}>
//     <Pressable style={[styles.subscriptionCardView , selected && styles.isSelected , subScriptionType === subscriptionType && styles.subscribedBannerCard]} onPress={handlePress} disabled={subScriptionType === subscriptionType}>
//          {
//             isSubscribed && subScriptionType === subscriptionType ? <CrossLine /> : null
//          }     
//          <View style={[styles.subscriptionCardDataView , subScriptionType === subscriptionType && styles.subscribedBanner]}>
//                 <Text style={styles.subscriptionCardTypeText}>{subscriptionType}</Text>
//                 <Text style={styles.subscriptionCardTypePrice}>{price}</Text>
//          </View>
//          <View style={styles.subscriptionCardDetailsView}>
//                 <Text style={styles.subscriptionCardDetailsMessage}>{details}</Text>
//          </View>

//        {
//          selected && 
//          <TouchableOpacity
//          onPress={onPress} 
//          style={[styles.subscriptionCardBtnView , disabled && {backgroundColor:'#D87085'}]}
//          disabled={disabled}>
//               <Text style={styles.subscriptionCardBtnText}>Subscribe Now</Text>
//          </TouchableOpacity>
//        }
         
                
//     </Pressable>
//         </ScrollView>
//       <HeaderBar title={'TabScreen'} />
//     </View>
//       <View>
//         <Button title="PAY" onPress={()=>onCheckout()} />
//       </View>
//       <PlatformPayButton
//         type={PlatformPay.ButtonType.Pay}
//         onPress={pay}
//         style={{
//           width: '100%',
//           height: 50,
//         }}
//       />

// <View>
//       <Button title="Open URL" onPress={() => openURL('https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xUDZwY1lTQ2RObGtxdFRLKPi6trIGMgZz7cl9ITU6LBatqi5fCbFmNmdYjD0UeD67NHA8giszINUztDY-UBIdjqIyP-58naK3BCOc')} />
//     </View>
//    </View>
//   )
// }

// export default PaymentScreen

// const styles = StyleSheet.create({})