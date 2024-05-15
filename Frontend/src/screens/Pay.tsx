import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';

const PaymentScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const initializePaymentSheet = async () => {
      const response = await axios.post('http://10.0.2.2:8000/chat/payments/pay', {
        amount: Math.floor(10 * 100), // amount in cents
      });
      setClientSecret(response.data.clientSecret);
      setLoading(true);
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: response.data.clientSecret,
        merchantDisplayName: 'Example, Inc.',
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
      });
      if (error) {
        console.error('Error initializing payment sheet:', error.message);
      }
    
    };

    initializePaymentSheet();
  }, []);

  const handleCheckout = async () => {
    if (!clientSecret) return;

    try {
      const { error } = await presentPaymentSheet({ paymentIntentClientSecret: clientSecret });
      if (error) {
        console.error('Error presenting payment sheet:', error.message);
      }
    } catch (error) {
      console.error('Error presenting payment sheet:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        // disabled={!loading}
        title="Checkout"
        onPress={handleCheckout}
      />
    </View>
  );
};

export default PaymentScreen;
