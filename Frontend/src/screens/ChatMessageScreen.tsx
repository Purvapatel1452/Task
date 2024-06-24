import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import EmojiSelector from 'react-native-emoji-selector';
import {useRoute} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import HeaderBar from '../components/HeaderBar';
import axios from 'axios';
import ExpenseBox from '../components/ExpenseBox';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMessages, sendMessage} from '../redux/slices/chatSlice';
import {
  fetchRecepientData,
  fetchUserExpenses,
} from '../redux/slices/recepientSlice';
import storage from '@react-native-firebase/storage';
import Modal from 'react-native-modal';
import HeaderChatBar from '../components/HeaderChatBar';
import FastImage from 'react-native-fast-image';
import firebase from '../firebase/firebaseConfig';

const ChatMessageScreen = ({navigation}: any) => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const route = useRoute();
  const {recepientId}: any = route.params;
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const [isExpense, setIsExpense] = useState(true);
  const [expenseList, setExpenseList] = useState([]);

  const [load,setLoad]=useState(false)

  const scrollViewRef = useRef(null);

  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.auth);
  const {messages, loading, error} = useSelector(state => state.chat);
  const {
    recepientDatas,
    userExpense,
    loading: recepientLoading,
    error: recepientError,
  } = useSelector(state => state.recepient);

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const isexpense = () => {
    setIsExpense(true);
  };

  const isChat = () => {
    scrollToBottom();
    setIsExpense(false);
  };

  useEffect(() => {
    dispatch(fetchMessages({userId, recepientId}));
    const chatId = userId > recepientId ? `${userId}_${recepientId}` : `${recepientId}_${userId}`;
    const messagesRef = firebase.database().ref(`chats/${chatId}`);

    const handleNewMessage = (snapshot) => {
      const newMessage = snapshot.val();
      dispatch(fetchMessages({ userId, recepientId }));
scrollToBottom()
     
    };

    messagesRef.on('child_added', handleNewMessage);

  
    dispatch(fetchUserExpenses({userId, recepientId}));
    dispatch(fetchRecepientData(recepientId));
    return () => {
      messagesRef.off('child_added', handleNewMessage);
    };
  }, [dispatch, userId, recepientId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 1000);
  };

  const formatTime = (time: any) => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  const handleSend = async(messageType: any, imageUri: any) => {
   console.log("!!")

   if (messageType == 'image') {
    const {uri}=imageUri

    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    console.log(uploadUri,"LLLL")

    const task = storage().ref(`chat/${filename}`).putFile(uploadUri);
    toggleModal()
   
    

    try {
      await task;
      const url = await storage().ref(`chat/${filename}`).getDownloadURL();
      console.log(url)


     
dispatch(sendMessage({ userId, recepientId,messageType:messageType, imageUrl:url }));
    
    } catch (e) {
      console.error(e);
    }

 

  } 

else{
   
      dispatch(sendMessage({ userId, recepientId,messageType:messageType, message }));
    }
    setMessage('');
    setSelectedImage('');

    scrollViewRef.current?.scrollToEnd({ animated: true });
    scrollToBottom()
    setLoad(true)
    setTimeout(()=>{
    setLoad(false)
    },2000)

  };

  // const handleSend = async (messageType: any, imageUri: any) => {
  //   try {
  //     //check msg type image or text
  //     let formData = {};

  //     if (messageType == 'image') {
  //       const {uri} = imageUri;

  //       const filename = uri.substring(uri.lastIndexOf('/') + 1);
  //       const uploadUri =
  //         Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

  //       const task = storage().ref(`chat/${filename}`).putFile(uploadUri);
  //       toggleModal();

  //       try {
  //         await task;
  //         const url = await storage().ref(`chat/${filename}`).getDownloadURL();

  //         formData = {
  //           senderId: userId,
  //           recepientId: recepientId,
  //           messageType: messageType,
  //           messageText: message,
  //           imageUrl: url,
  //         };
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     } else {
  //       formData = {
  //         senderId: userId,
  //         recepientId: recepientId,
  //         messageType: messageType,
  //         messageText: message,
  //         imageUrl: null,
  //       };
  //     }

  //     dispatch(sendMessage({formData})).then(response => {});

  //     if (messageType == 'image') {
  //       setTimeout(() => {
  //         dispatch(fetchMessages({userId, recepientId: recepientId}));
  //       }, 2000);
  //     } else {
  //       setTimeout(() => {
  //         dispatch(fetchMessages({userId, recepientId: recepientId}));
  //       }, 1000);
  //     }

  //     setMessage('');
  //     setSelectedImage('');

  //     scrollToBottom();
  //   } catch (err) {
  //     console.log('error in sending msg', err);
  //   }
  // };

  const pickImage = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        const source = {uri: image.path};
        handleSend('image', source);
      })
      .catch(err => {
        console.log('Error in uploading image', err);
      });
  };

  const pickCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const source = {uri: image.path};
      handleSend('image', source);
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

const sortedMessages = [...messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
console.log(sortedMessages,"SSOORRTT")

return (
    <View style={{flex: 1}}>
      <HeaderChatBar title={'ChatMessageScreen'} id={recepientId} />

      <View style={styles.pressableContainer}>
        <View style={styles.pressableContainer1}>
          <TouchableOpacity onPress={() => isexpense()}>
            <Text style={{color: 'black'}}>Expenses</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pressableContainer2}>
          <TouchableOpacity onPress={() => isChat()}>
            <Text style={{color: 'black'}}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isExpense ? (
        <ScrollView ref={scrollViewRef}>
          <Pressable>
            {recepientLoading ? (
              <ActivityIndicator />
            ) : recepientError ? (
              <Text>Error loading expenses: {recepientError}</Text>
            ) : (
              userExpense.map((item, index) => (
                <ExpenseBox key={index} item={item} />
              ))
            )}
          </Pressable>
        </ScrollView>
      ) : (
        <KeyboardAvoidingView style={styles.keyboardContainer}>
          <ScrollView ref={scrollViewRef}>
{            sortedMessages.map((item: any, index) => {
              if (item.messageType == 'text') {
                return (
                  <Pressable
                    key={index}
                    style={[
                      !item.senderId
                        ? {
                            alignSelf: 'flex-end',
                            backgroundColor: '#DCF8C6',
                            padding: 8,
                            maxWidth: '60%',
                            borderRadius: 7,
                            margin: 10,
                          }
                        : item.senderId== userId
                        ? {
                            alignSelf: 'flex-end',
                            backgroundColor: '#DCF8C6',
                            padding: 8,
                            maxWidth: '60%',
                            borderRadius: 7,
                            margin: 10,
                          }
                        : {
                            alignSelf: 'flex-start',
                            backgroundColor: 'white',
                            padding: 8,
                            margin: 10,
                            borderRadius: 7,
                            maxWidth: '60%',
                          },
                    ]}>
                    <Text style={styles.textMessage}>{item.message}</Text>
                    <Text style={styles.textMsgTime}>
                      {formatTime(item.timestamp)}
                    </Text>
                  </Pressable>
                );
              }
              if (item.messageType === 'image') {
                const source = item.imageUrl;

                return (
                  <Pressable
                    key={index}
                    style={[
                      !item.senderId
                        ? {
                            alignSelf: 'flex-end',
                            backgroundColor: '#DCF8C6',
                            padding: 8,
                            maxWidth: '60%',
                            borderRadius: 7,
                            margin: 10,
                          }
                        : item.senderId== userId
                        ? {
                            alignSelf: 'flex-end',
                            backgroundColor: '#DCF8C6',
                            padding: 8,
                            maxWidth: '60%',
                            borderRadius: 7,
                            margin: 10,
                          }
                        : {
                            alignSelf: 'flex-start',
                            backgroundColor: 'white',
                            padding: 8,
                            margin: 10,
                            borderRadius: 7,
                            maxWidth: '60%',
                          },
                    ]}>
                    <View>
                      <FastImage
                        source={{uri: source}}
                        style={{width: 200, height: 200, borderRadius: 7}}
                      />
                      <Text
                        style={{
                          textAlign: 'right',
                          fontSize: 9,
                          position: 'absolute',
                          right: 10,
                          bottom: 7,
                          color: 'white',
                          marginTop: 5,
                        }}>
                        {formatTime(item?.timestamp)}
                      </Text>
                    </View>
                  </Pressable>
                );
              }
            })}
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 10,
              paddingBottom: 60,

              borderTopWidth: 1,
              borderTopColor: '#dddddd',
              marginBottom: showEmojiSelector ? 0 : 20,
            }}>
            <Entypo
              onPress={() => handleEmojiPress()}
              name="emoji-happy"
              style={{marginRight: 5}}
              size={24}
              color="gray"
            />

            <TextInput
              style={styles.inputText}
              value={message}
              onChangeText={text => setMessage(text)}
              placeholder="Type your message ..."
              placeholderTextColor={'gray'}
            />

            <View style={styles.iconContainer}>
              <Entypo
                onPress={toggleModal}
                name="camera"
                size={24}
                color="gray"
              />

              <Feather name="mic" size={24} color="gray" />
            </View>

            <Pressable
              onPress={() => handleSend('text')}
              style={styles.sendContainer}>
              <Text style={styles.sendText}>Send</Text>
            </Pressable>
          </View>

          {showEmojiSelector && (
            <EmojiSelector
              style={{height: 250}}
              onEmojiSelected={emoji => {
                setMessage(prevMessage => prevMessage + emoji);
              }}
            />
          )}
        </KeyboardAvoidingView>
      )}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={pickImage} style={styles.iconContainer1}>
              <Feather name="image" size={30} color="#595959" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pickCamera}
              style={styles.iconContainer1}>
              <Feather name="camera" size={30} color="#595959" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={toggleModal} style={{marginTop: 20}}>
            <Text style={styles.modalOption}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ChatMessageScreen;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  headerProfilePic: {
    height: 35,
    width: 35,
    borderRadius: 17,
  },
  inputText: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  sendContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#D77702',
  },
  sendText: {
    fontWeight: 'bold',
    color: 'white',
  },
  nameText: {
    color: 'black',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
  profileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textMessage: {
    fontSize: 15,
    textAlign: 'left',
    color: 'black',
  },
  textMsgTime: {
    fontSize: 11,
    textAlign: 'right',
    color: 'gray',
    marginTop: 4,
  },
  pressableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 0.9,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#D0D0D0',
    padding: 10,
    justifyContent: 'center',
  },
  pressableContainer1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 4,
    borderColor: '#D77702',
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',

    marginTop: -5,
    height: 40,
  },
  pressableContainer2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 4,
    borderColor: '#D77702',
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',

    marginTop: -5,
    height: 40,
  },
  modalOption: {
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
  },
  iconContainer1: {
    backgroundColor: 'silver',
    borderRadius: 50,
    padding: 15,
  },
});

















// import React, {
//   useContext,
//   useEffect,
//   useLayoutEffect,
//   useRef,
//   useState,
// } from 'react';

// import {
//   ActivityIndicator,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import Entypo from 'react-native-vector-icons/Entypo';
// import Feather from 'react-native-vector-icons/Feather';
// import EmojiSelector from 'react-native-emoji-selector';
// import {useRoute} from '@react-navigation/native';

// import Icon from 'react-native-vector-icons/Ionicons';
// import ImagePicker from 'react-native-image-crop-picker';
// import HeaderBar from '../components/HeaderBar';
// import axios from 'axios';
// import ExpenseBox from '../components/ExpenseBox';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchMessages, sendMessage} from '../redux/slices/chatSlice';
// import {
//   fetchRecepientData,
//   fetchUserExpenses,
// } from '../redux/slices/recepientSlice';
// import storage from '@react-native-firebase/storage';
// import Modal from 'react-native-modal';
// import HeaderChatBar from '../components/HeaderChatBar';
// import FastImage from 'react-native-fast-image';
// import firebase from '../firebase/firebaseConfig';

// const ChatMessageScreen = ({navigation}: any) => {
//   const [showEmojiSelector, setShowEmojiSelector] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);

//   const route = useRoute();
//   const {recepientId}: any = route.params;
//   const [message, setMessage] = useState('');
//   const [selectedImage, setSelectedImage] = useState('');

//   const [isExpense, setIsExpense] = useState(true);
//   const [expenseList, setExpenseList] = useState([]);
  

  

//   const scrollViewRef = useRef(null);

//   const dispatch = useDispatch();
//   const {userId} = useSelector(state => state.auth);
//   const {messages, loading, error} = useSelector(state => state.chat);
//   const {
//     recepientDatas,
//     userExpense,
//     loading: recepientLoading,
//     error: recepientError,
//   } = useSelector(state => state.recepient);
//   let msg
//   console.log(messages,"FIRSTT")
//   if(messages){
//     msg=messages[0]
//     console.log("MMSSGGG",msg)
//   }
//   const handleEmojiPress = () => {
//     setShowEmojiSelector(!showEmojiSelector);
//   };

//   const isexpense = () => {
//     setIsExpense(true);
//   };

//   const isChat = () => {
//     scrollToBottom();
//     setIsExpense(false);
//   };

//   useEffect(() => {
//     dispatch(fetchMessages({userId, recepientId}));
//     const chatId = userId > recepientId ? `${userId}_${recepientId}` : `${recepientId}_${userId}`;
//     const messagesRef = firebase.database().ref(`chats/${chatId}`);

//     const handleNewMessage = (snapshot) => {
//       const newMessage = snapshot.val();
//       dispatch(fetchMessages({ userId, recepientId }));
//       setTimeout(()=>{
//         console.log("FETCHING",messages)

//       },2000)
     
//     };

//     messagesRef.on('child_added', handleNewMessage);

  
//     dispatch(fetchUserExpenses({userId, recepientId}));
//     dispatch(fetchRecepientData(recepientId));
//     return () => {
//       messagesRef.off('child_added', handleNewMessage);
//     };
//   }, [dispatch, userId, recepientId]);

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       scrollViewRef.current?.scrollToEnd({animated: true});
//     }, 1000);
//   };

//   const formatTime = (time: any) => {
//     const options = {hour: 'numeric', minute: 'numeric'};
//     return new Date(time).toLocaleString('en-US', options);
//   };

//   const handleSend = () => {
   
//     if (message.trim()) {
//       console.log(userId,"::::",recepientId,"::::",message,"ENDed")
//       dispatch(sendMessage({ userId, recepientId, message }));
//       setMessage('');
//       scrollViewRef.current?.scrollToEnd({ animated: true });
   
//     }
//   };

//   // const handleSend = async (messageType: any, imageUri: any) => {
//   //   try {
//   //     //check msg type image or text
//   //     let formData = {};

//   //     if (messageType == 'image') {
//   //       const {uri} = imageUri;

//   //       const filename = uri.substring(uri.lastIndexOf('/') + 1);
//   //       const uploadUri =
//   //         Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

//   //       const task = storage().ref(`chat/${filename}`).putFile(uploadUri);
//   //       toggleModal();

//   //       try {
//   //         await task;
//   //         const url = await storage().ref(`chat/${filename}`).getDownloadURL();

//   //         formData = {
//   //           senderId: userId,
//   //           recepientId: recepientId,
//   //           messageType: messageType,
//   //           messageText: message,
//   //           imageUrl: url,
//   //         };
//   //       } catch (e) {
//   //         console.error(e);
//   //       }
//   //     } else {
//   //       formData = {
//   //         senderId: userId,
//   //         recepientId: recepientId,
//   //         messageType: messageType,
//   //         messageText: message,
//   //         imageUrl: null,
//   //       };
//   //     }

//   //     dispatch(sendMessage({formData})).then(response => {});

//   //     if (messageType == 'image') {
//   //       setTimeout(() => {
//   //         dispatch(fetchMessages({userId, recepientId: recepientId}));
//   //       }, 2000);
//   //     } else {
//   //       setTimeout(() => {
//   //         dispatch(fetchMessages({userId, recepientId: recepientId}));
//   //       }, 1000);
//   //     }

//   //     setMessage('');
//   //     setSelectedImage('');

//   //     scrollToBottom();
//   //   } catch (err) {
//   //     console.log('error in sending msg', err);
//   //   }
//   // };

//   const pickImage = async () => {
//     await ImagePicker.openPicker({
//       width: 300,
//       height: 400,
//       cropping: true,
//     })
//       .then(image => {
//         const source = {uri: image.path};
//         handleSend('image', source);
//       })
//       .catch(err => {
//         console.log('Error in uploading image', err);
//       });
//   };

//   const pickCamera = () => {
//     ImagePicker.openCamera({
//       width: 300,
//       height: 400,
//       cropping: true,
//     }).then(image => {
//       const source = {uri: image.path};
//       handleSend('image', source);
//     });
//   };

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };


//   return (
//     <View style={{flex: 1}}>
//       <HeaderChatBar title={'ChatMessageScreen'} id={recepientId} />

   
     
//         <KeyboardAvoidingView style={styles.keyboardContainer}>
      
       
         
        

//             <View>
//               {
//                 loading ?
//                 <ActivityIndicator />
//                 :
                
//                 messages.map(item=>{
//                   return(
//                     <Text style={{color:"black",fontSize:20}}>{item.message}</Text>

//                   )
                  

//                 })
//               }

//             </View>
          
 

//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//               paddingBottom: 60,

//               borderTopWidth: 1,
//               borderTopColor: '#dddddd',
//               marginBottom: showEmojiSelector ? 0 : 20,
//             }}>
//             <Entypo
//               onPress={() => handleEmojiPress()}
//               name="emoji-happy"
//               style={{marginRight: 5}}
//               size={24}
//               color="gray"
//             />

//             <TextInput
//               style={styles.inputText}
//               value={message}
//               onChangeText={text => setMessage(text)}
//               placeholder="Type your message ..."
//               placeholderTextColor={'gray'}
//             />

          

//             <Pressable
//               onPress={() => handleSend('text')}
//               style={styles.sendContainer}>
//               <Text style={styles.sendText}>Send</Text>
//             </Pressable>
//           </View>


//         </KeyboardAvoidingView>
      
     
//     </View>
//   );
// };

// export default ChatMessageScreen;

// const styles = StyleSheet.create({
//   keyboardContainer: {
//     flex: 1,
//     backgroundColor: '#F0F0F0',
//   },
//   headerContainer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 10,
//   },
//   headerProfilePic: {
//     height: 35,
//     width: 35,
//     borderRadius: 17,
//   },
//   inputText: {
//     flex: 1,
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#dddddd',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     color: 'black',
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     gap: 7,
//     alignItems: 'center',
//     marginHorizontal: 8,
//   },
//   sendContainer: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#D77702',
//   },
//   sendText: {
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   nameText: {
//     color: 'black',
//     marginLeft: 5,
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   textMessage: {
//     fontSize: 15,
//     textAlign: 'left',
//     color: 'black',
//   },
//   textMsgTime: {
//     fontSize: 11,
//     textAlign: 'right',
//     color: 'gray',
//     marginTop: 4,
//   },
//   pressableContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     borderWidth: 0.9,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     borderBottomWidth: 1,
//     borderColor: '#D0D0D0',
//     padding: 10,
//     justifyContent: 'center',
//   },
//   pressableContainer1: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     borderWidth: 0,
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 4,
//     borderColor: '#D77702',
//     padding: 5,
//     textAlign: 'center',
//     justifyContent: 'center',

//     marginTop: -5,
//     height: 40,
//   },
//   pressableContainer2: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     borderWidth: 0,
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 4,
//     borderColor: '#D77702',
//     padding: 5,
//     textAlign: 'center',
//     justifyContent: 'center',

//     marginTop: -5,
//     height: 40,
//   },
//   modalOption: {
//     fontSize: 18,
//     padding: 5,
//     textAlign: 'center',
//   },
//   iconContainer1: {
//     backgroundColor: 'silver',
//     borderRadius: 50,
//     padding: 15,
//   },
// });
