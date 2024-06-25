// import React, {useEffect} from 'react';

// import {StripeProvider} from '@stripe/stripe-react-native';

// import {StyleSheet, Text, View} from 'react-native';

// import AppStack from './src/navigations/stack/AppStack';
// import {BASE_URL, STRIPE_KEY} from '@env';
// import Chat from './src/screens/Chat';

// // const STRIPE_KEY =
// //   'pk_test_51P6pcYSCdNlkqtTKf1k30wMs98GFCxjtiGa8CfD7qfYqf2CqhA6ktkPi6gavaiaxwmScevN1lZGrIGpw7P57kLwo00H2QrdopU';

// const App = () => {
//   console.log(BASE_URL,">gd5y>>ferg>>>",STRIPE_KEY);

//   return (
//     <StripeProvider publishableKey={STRIPE_KEY}>
//       <AppStack />
//     </StripeProvider>
//     // <View>
//     //   <Chat />
//     // </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});




import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';

import messaging from '@react-native-firebase/messaging';

const App = () => {
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFCMToken();

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);
  return (
    <SafeAreaView>
      <Text>Firebase Notification tutorial</Text>
    </SafeAreaView>
  );
};

export default App;


