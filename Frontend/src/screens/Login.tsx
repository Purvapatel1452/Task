// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
//   Alert,
//   KeyboardAvoidingView,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';

// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {TextInput} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import {decode} from 'base-64';
// import {useDispatch, useSelector} from 'react-redux';
// import { setUser } from '../redux/slices/authSlice';

// const Login = ({props}: any) => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(true);

//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   const checkLogin = async () => {
//   //     try {
//   //       const token = await AsyncStorage.getItem('authToken');

//   //       if (token) {
//   //         const [_, payloadBase64, __] = token.split('.');
//   //         const decodedPayload = decode(payloadBase64);
//   //         const decodedToken = JSON.parse(decodedPayload);
//   //         // console.log("decodedToken" , decodedToken)
//   //         const userid = decodedToken.userId;
//   //         console.log('LOGI', userid);

//   //         dispatch(setUser({userid,token}))
//   //         navigation.navigate('stack');
//   //       } else {
//   //         navigation.navigate('Login');
//   //       }
//   //     } catch (err) {
//   //       console.log('Error:', err);
//   //     }
//   //   };

//   //   checkLogin();
//   // }, []);

//   const handleSubmit = async () => {
//     const userData = {
//       email: email,
//       password: password,
//     };
//     if (email && password) {
//       await axios
//         .post('http://10.0.2.2:8000/chat/user/login', userData)
//         .then(response => {
//           // console.log(res.data)
//           const token = response.data.data;
//           console.log('tokrn', token);
//           if (token) {
//             const [_, payloadBase64, __] = token.split('.');
//             const decodedPayload = decode(payloadBase64);
//             const decodedToken = JSON.parse(decodedPayload);
//             // console.log("decodedToken" , decodedToken)
//             const userid = decodedToken.userId;
  
           
//           AsyncStorage.setItem('authToken', token);
//            dispatch(setUser({userid,token}))
       

//           navigation.navigate('Stack');
//           }
//         })
//         .catch(err => {
//           console.log('j', JSON.stringify(err.response.data.message));
//           Alert.alert(JSON.stringify(err.response.data.message));
//         });
//     } else {
//       Alert.alert('Fill mandatory details');
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={styles.mainContainer} behavior="padding">
//       <ScrollView contentContainerStyle={{flexGrow: 1}}>
//         <View>
//           <View style={styles.loginContainer}>
//             <Text style={styles.text_header}>Login</Text>

//             <View style={styles.action}>
//               <FontAwesome
//                 name="user-o"
//                 color="#D77702"
//                 style={styles.smallIcon}
//               />
//               <TextInput
//                 placeholder="Mobile or Email"
//                 style={styles.textInput}
//                 onChangeText={e => setEmail(e)}
//                 placeholderTextColor={'gray'}
//               />
//             </View>
//             <View style={styles.action}>
//               <FontAwesome
//                 name="lock"
//                 color="#D77702"
//                 style={styles.smallIcon}
//               />
//               <TextInput
//                 placeholder="Password"
//                 style={styles.textInput}
//                 onChangeText={e => setPassword(e)}
//                 secureTextEntry={showPassword}
//                 placeholderTextColor={'gray'}
//               />
//               <TouchableHighlight
//                 onPress={() => setShowPassword(!showPassword)}>
//                 {password.length < 1 ? (
//                   <Text></Text>
//                 ) : !showPassword ? (
//                   <Feather
//                     name="eye-off"
//                     color={'green'}
//                     size={23}
//                     style={{marginRight: -6}}
//                   />
//                 ) : (
//                   <Feather
//                     name="eye"
//                     color={'green'}
//                     size={23}
//                     style={{marginRight: -6}}
//                   />
//                 )}
//               </TouchableHighlight>
//             </View>
//             <View
//               style={{
//                 marginLeft: 140,
//                 justifyContent: 'flex-end',
//                 alignItems: 'flex-end',
//                 marginTop: 8,
//                 marginRight: 10,
//               }}>
//               <Text style={{color: 'gray', fontWeight: '700'}}>
//                 Forgot Password
//               </Text>
//             </View>
//           </View>
//           <View style={styles.button}>
//             <TouchableHighlight style={styles.inBut} onPress={handleSubmit}>
//               <Text style={styles.textSign}>Log In</Text>
//             </TouchableHighlight>
//             <View style={{padding: 15}}>
//               <Text
//                 style={{
//                   padding: 2,
//                   color: 'white',
//                   fontWeight: 'bold',
//                   fontSize: 14,
//                   backgroundColor: 'gray',
//                   borderRadius: 12,
//                 }}>
//                 ---Or Continue as---
//               </Text>
//             </View>
//             <View style={styles.bottomButton}>
//               <View
//                 style={{
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 <TouchableHighlight style={styles.inBut2}>
//                   <FontAwesome
//                     name="user-circle-o"
//                     color="white"
//                     style={styles.smallIcon2}
//                   />
//                 </TouchableHighlight>
//                 <Text style={styles.bottomText}>Guest</Text>
//               </View>
//               <View
//                 style={{
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 <TouchableHighlight
//                   style={styles.inBut2}
//                   onPress={() => navigation.navigate('SignUp')}>
//                   <FontAwesome
//                     name="user-plus"
//                     color="white"
//                     style={styles.smallIcon2}
//                   />
//                 </TouchableHighlight>
//                 <Text style={styles.bottomText}>Sign Up</Text>
//               </View>
//               <View
//                 style={{
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 <TouchableHighlight style={styles.inBut2}>
//                   <FontAwesome
//                     name="google"
//                     color="white"
//                     style={styles.smallIcon2}
//                   />
//                 </TouchableHighlight>
//                 <Text style={styles.bottomText}>Google</Text>
//               </View>
//               <View
//                 style={{
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 <TouchableHighlight style={styles.inBut2}>
//                   <FontAwesome
//                     name="facebook-f"
//                     color="white"
//                     style={styles.smallIcon2}
//                   />
//                 </TouchableHighlight>
//                 <Text style={styles.bottomText}>Facebook</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   mainContainer: {
//     backgroundColor: 'silver',
//   },
//   textSign: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   smallIcon: {
//     marginRight: 10,
//     fontSize: 24,
//   },
//   logoContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     height: 260,
//     width: 260,
//     marginTop: 30,
//   },
//   text_footer: {
//     color: '#D77702',
//     fontSize: 18,
//   },
//   action: {
//     flexDirection: 'row',
//     paddingTop: 14,
//     paddingBottom: 3,
//     marginTop: 15,

//     paddingHorizontal: 15,

//     borderWidth: 1,
//     borderColor: '#D77702',
//     borderRadius: 50,
//   },
//   textInput: {
//     flex: 1,
//     marginTop: -12,

//     color: '#05375a',
//   },

//   loginContainer: {
//     width: 320,
//     marginTop: 180,
//     marginHorizontal: 48,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   header: {
//     justifyContent: 'flex-end',
//     paddingHorizontal: 20,
//   },
//   text_header: {
//     color: '#D77702',
//     fontWeight: 'bold',
//     fontSize: 30,
//   },
//   button: {
//     alignItems: 'center',
//     marginTop: 30,
//     textAlign: 'center',
//     margin: 20,
//   },
//   inBut: {
//     width: '70%',
//     backgroundColor: '#D77702',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     borderRadius: 50,
//   },
//   inBut2: {
//     backgroundColor: '#D77702',
//     height: 65,
//     width: 65,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bottomButton: {
//     marginTop: 10,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   smallIcon2: {
//     fontSize: 40,
//     // marginRight: 10,
//   },
//   bottomText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '600',
//     marginTop: 5,
//   },
// });















import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {decode} from 'base-64';

import { login } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../redux/slices/authSlice';

const Login = ({props}: any) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const dispatch = useDispatch();
  const {loading,error}=useSelector((state)=>state.auth)

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('authToken');

  //       if (token) {
  //         const [_, payloadBase64, __] = token.split('.');
  //         const decodedPayload = decode(payloadBase64);
  //         const decodedToken = JSON.parse(decodedPayload);
  //         // console.log("decodedToken" , decodedToken)
  //         const userid = decodedToken.userId;
  //         console.log('LOGI', userid);

  //         dispatch(setUser({userid,token}))
  //         navigation.navigate('stack');
  //       } else {
  //         navigation.navigate('Login');
  //       }
  //     } catch (err) {
  //       console.log('Error:', err);
  //     }
  //   };

  //   checkLogin();
  // }, []);

  const handleSubmit = async () => {
    const userData = {
      email: email,
      password: password,
    };
    if (email && password) {
    
      // await axios
      //   .post('http://10.0.2.2:8000/chat/user/login', userData)
      //   .then(response => {
      //     // console.log(res.data)
      //     const token = response.data.data;
      //     console.log('tokrn', token);
      //     if (token) {
      //       const [_, payloadBase64, __] = token.split('.');
      //       const decodedPayload = decode(payloadBase64);
      //       const decodedToken = JSON.parse(decodedPayload);
      //       // console.log("decodedToken" , decodedToken)
      //       const userid = decodedToken.userId;
  
           
      //     AsyncStorage.setItem('authToken', token);
      //      dispatch(setUser({userid,token}))
       

      //     navigation.navigate('Stack');
      //     }
      //   })
      //   .catch(err => {
      //     console.log('j', JSON.stringify(err.response.data.message));
      //     Alert.alert(JSON.stringify(err.response.data.message));
      //   });

      dispatch(login({email,password}))
        .then((result)=>{
          if(result.type==='auth/login/fulfilled'){
            navigation.navigate('Stack');
          }
          else{
            Alert.alert(result.payload);
          }
        })
    } else {
      Alert.alert('Fill mandatory details');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer} behavior="padding">
            <StatusBar backgroundColor={'#D77702'} />
      <ScrollView contentContainerStyle={{}}>
        <View>
          <View style={styles.loginContainer}>
            <Text style={styles.text_header}>Login</Text>

            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color="#D77702"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Mobile or Email"
                style={styles.textInput}
                onChangeText={e => setEmail(e)}
                placeholderTextColor={'gray'}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome
                name="lock"
                color="#D77702"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                onChangeText={e => setPassword(e)}
                secureTextEntry={showPassword}
                placeholderTextColor={'gray'}
              />
              <TouchableHighlight
                onPress={() => setShowPassword(!showPassword)}>
                {password.length < 1 ? (
                  <Text></Text>
                ) : !showPassword ? (
                  <Feather
                    name="eye-off"
                    color={'green'}
                    size={23}
                    style={{marginRight: -6}}
                  />
                ) : (
                  <Feather
                    name="eye"
                    color={'green'}
                    size={23}
                    style={{marginRight: -6}}
                  />
                )}
              </TouchableHighlight>
            </View>
            <View
              style={{
                marginLeft: 140,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginTop: 8,
                marginRight: 10,
              }}>
              <Text style={{color: 'gray', fontWeight: '700'}}>
                Forgot Password
              </Text>
            </View>
          </View>
          <View style={styles.button}>
            <TouchableHighlight style={styles.inBut} onPress={handleSubmit} disabled={loading}>
              <Text style={styles.textSign}>{loading ? ' Loading...' : 'Log In'}</Text>
            </TouchableHighlight>
            <View style={{padding: 15}}>
              <Text
                style={{
                  padding: 2,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 14,
                  backgroundColor: 'gray',
                  borderRadius: 12,
                }}>
                ---Or Continue as---
              </Text>
            </View>
            <View style={styles.bottomButton}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableHighlight
                  style={styles.inBut2}
                  onPress={() => navigation.navigate('SignUp')}>
                  <FontAwesome
                    name="user-plus"
                    color="white"
                    style={styles.smallIcon2}
                  />
                </TouchableHighlight>
                <Text style={styles.bottomText}>Sign Up</Text>
              </View>
             
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'silver',
    flex:1
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 260,
    width: 260,
    marginTop: 30,
  },
  text_footer: {
    color: '#D77702',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 3,
    marginTop: 15,

    paddingHorizontal: 15,

    borderWidth: 1,
    borderColor: '#D77702',
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    marginTop: -12,

    color: '#05375a',
  },

  loginContainer: {
    width: 320,
    marginTop: 180,
    marginHorizontal: 48,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    elevation:4,
    shadowColor:'black',
    shadowOpacity:10
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#D77702',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
    textAlign: 'center',
    margin: 20,
    
    
  },
  inBut: {
    width: '70%',
    backgroundColor: '#D77702',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
    elevation:4,
    shadowColor:'black',
    shadowOpacity:10
  },
  inBut2: {
    backgroundColor: '#D77702',
    height: 65,
    width: 65,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation:4,
    shadowColor:'black',
    shadowOpacity:10
  },
  bottomButton: {
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
    elevation:4,
    shadowColor:'black',
    
  },
  smallIcon2: {
    fontSize: 40,
    // marginRight: 10,
  },
  bottomText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
});
