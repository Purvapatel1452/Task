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



const ChatMessageScreen = ({navigation}: any) => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const route = useRoute();
  const {recepientId}: any = route.params;
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const [isExpense, setIsExpense] = useState(true);
  const [expenseList, setExpenseList] = useState([]);

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

    scrollToBottom()
    setIsExpense(false);
    
  };

  // const userExpenses=async()=>{
  //   console.log("+++++++++++++++++++++++++++++++")
  //   try{
  //  console.log(recepientId,"0000;;;;")
  //     const response= await axios.get(`http://10.0.2.2:8000/chat/expense/userExpenses/${userId}/${recepientId}`);

  //     console.log(response.data,")))")

  //     setExpenseList(response.data)

  //   }
  //   catch(error){
  //     console.log("internal server error",error);

  //   }
  // }

  // const fetchMessage = async () => {
  //   try {

  //     dispatch(fetchMessages({userId,recepientId}))

  //   } catch (err) {
  //     console.log('error in fetching msg', err);
  //   }
  // };

  // useEffect(() => {

  //   dispatch(fetchMessages({userId,recepientId}))
  //   dispatch(fetchUserExpenses({userId,recepientId}))

  // }, []);
  useEffect(() => {
    dispatch(fetchMessages({userId, recepientId}));
    dispatch(fetchUserExpenses({userId, recepientId}));
    dispatch(fetchRecepientData(recepientId));
  }, [dispatch, userId, recepientId]);

  // useEffect(() => {
  //   const fetchRecepientData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://10.0.2.2:8000/chat/message/user/${recepientId}`,
  //       );

  //       const data = await response.json();

  //       setRecepientData(data);
  //     } catch (err) {
  //       console.log('error in frontend', err);
  //     }
  //   };

  //   fetchRecepientData();
  // }, []);

  // useEffect(()=>{

  //   dispatch(fetchRecipientData(recepientId))

  // },[])

  // const handleSend = async (messageType: any, imageUri: any) => {
  //   try {
  //     const formData = new FormData();

  //     formData.append('senderId', userId);
  //     formData.append('recepientId', recepientId);

  //     //check msg type image or text

  //     if (messageType == 'image') {
  //       formData.append('messageType', 'image');
  //       formData.append('imageFile', {
  //         uri: imageUri,
  //         name: 'image.jpg',
  //         type: 'image/jpeg',
  //       });
  //     } else {
  //       formData.append('messageType', 'text');
  //       formData.append('messageText', message);
  //     }

  //     const response = await fetch(
  //       'http://10.0.2.2:8000/chat/message/sendMessages',
  //       {
  //         method: 'POST',
  //         body: formData,
  //       },
  //     );

  //     if (response.ok) {
  //       setMessage('');
  //       setSelectedImage('');
  //     }

  //     fetchMessages();
  //   } catch (err) {
  //     console.log('error in sending msg', err);
  //   }
  // };
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 1000);
  };

  // const handleSend = async (messageType: any, imageUri: any) => {
  //   try {
  //     console.log('SENNDD');
  //     const formData = new FormData();

  //     formData.append('senderId', userId);
  //     formData.append('recepientId', recepientId);

  //     //check msg type image or text

  //     if (messageType == 'image') {
  //       formData.append('messageType', 'image');
  //       formData.append('imageFile', {
  //         uri: imageUri,
  //         name: 'image.jpg',
  //         type: 'image/jpeg',
  //       });
  //     } else {
  //       console.log('1111');
  //       formData.append('messageType', 'text');
  //       formData.append('messageText', message);
  //     }
  //     console.log(formData, '!!!!!!y');

  //     dispatch(sendMessage({formData})).then(response => {
  //       console.log(response, '))))))');
  //     });

  //     dispatch(fetchMessages({userId, recepientId}));

  //     setMessage('');
  //     setSelectedImage('');

  //     scrollToBottom();
  //   } catch (err) {
  //     console.log('error in sending msg', err);
  //   }
  // };

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: '',
  //     headerLeft: () => (
  //       <View style={styles.headerContainer}>
  //         <Icon
  //           onPress={() => navigation.goBack()}
  //           name="arrow-back"
  //           size={24}
  //           color="black"
  //         />

  //         <View style={styles.profileContainer}>
  //           <Image
  //             style={styles.headerProfilePic}
  //             source={{uri: recepientData.image}}
  //           />

  //           <Text style={styles.nameText}>{recepientData.name}</Text>
  //         </View>
  //       </View>
  //     )
  //     // tabBarVisible:false
  //   });
  // }, [recepientData]);

  const formatTime = (time: any) => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };



  const handleSend = async (messageType: any, imageUri: any) => {
    try {

    
   
  
  
  
      //check msg type image or text
      let formData={}
     
      if (messageType == 'image') {
        const {uri}=imageUri
  
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  
     
    
        const task = storage().ref(`chat/${filename}`).putFile(uploadUri);
        toggleModal()
       
        
  
        try {
          await task;
          const url = await storage().ref(`chat/${filename}`).getDownloadURL();
       
  
   
    formData={
      senderId:userId,
      recepientId:recepientId,
      messageType:messageType,
      messageText:message,
      imageUrl:url
    }
  
   
         
    
        
        } catch (e) {
          console.error(e);
        }
    
     
  
      } else {
       
        formData={
          senderId:userId,
          recepientId:recepientId,
          messageType:messageType,
          messageText:message,
          imageUrl:null
        }
      }
    
    
     
     dispatch(sendMessage({formData}))
      .then((response)=>{
  
       
  
  })
  
  if (messageType == 'image') {

    setTimeout(() => {
      dispatch(fetchMessages({userId,recepientId:recepientId}))
      
    }, 2000);
  
  }else{
    setTimeout(() => {
      dispatch(fetchMessages({userId,recepientId:recepientId}))
      
    }, 1000);
  
  }

     
        setMessage('');
        setSelectedImage('');

          
        scrollToBottom()
  
    } catch (err) {
      console.log('error in sending msg', err);
    }
  };





  // const pickImage=async()=>{
  //   const result=await ImagePicker.launchCameraAsync({
  //     mediaType:ImagePicker.launchImageLibrary,
  //     allowsEditing:true,
  //     aspect:[4,3],
  //     quality:1
  //   })
  //   console.log(result)

  // const options = {
  //   title: 'Select Image',
  //   storageOptions: {
  //     skipBackup: true,
  //     path: 'images',
  //   },
  // };

  // const pickImage=()=>{
  //   ImagePicker.launchImageLibrary(options, (response) => {
  //   console.log('Response = ', response);

  //   if (response.didCancel) {
  //     console.log('User cancelled image picker');
  //   } else if (response.error) {
  //     console.log('ImagePicker Error: ', response.error);
  //   } else {
  //     // Use the selected image URI
  //     const source = { uri: response.uri };
  //     // You can also display the image using the source.uri
  //   }
  // });
  // }

  const pickImage = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
       
        const source={uri:image.path}
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
     
      const source={uri:image.path}
      handleSend('image', source);
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
            {messages.map((item: any, index) => {
              if (item.messageType == 'text') {
                return (
                  <Pressable
                    key={index}
                    style={[
                      !item.senderId._id
                        ? {
                            alignSelf: 'flex-end',
                            backgroundColor: '#DCF8C6',
                            padding: 8,
                            maxWidth: '60%',
                            borderRadius: 7,
                            margin: 10,
                          }
                        : item.senderId._id == userId
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
                      {formatTime(item.timeStamp)}
                    </Text>
                  </Pressable>
                );
              }
              if (item.messageType === 'image') {
                // const baseUrl =
                //   'react native/final_demo_copy-chat/Chat-RN_App/Backend/files/';
                // const imageUrl = item.imageUrl;
                // console.log('IO', imageUrl);
                // const filename = imageUrl.split('\\').pop();
                // console.log('F', filename);
                // // const source={uri:baseUrl+filename}
                const source =item.imageUrl
               
                return (
                  <Pressable
                    key={index}
                    style={[
                      !item.senderId._id ?
                      {
                        alignSelf: 'flex-end',
                        backgroundColor: '#DCF8C6',
                        padding: 8,
                        maxWidth: '60%',
                        borderRadius: 7,
                        margin: 10,
                      }
                      :
                      item.senderId._id == userId
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
                        {formatTime(item?.timeStamp)}
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
        style={{ justifyContent: 'flex-end', margin: 0 }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={pickImage} style={styles.iconContainer1}>
              <Feather name="image" size={30} color="#595959" />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickCamera} style={styles.iconContainer1}>
              <Feather name="camera" size={30} color="#595959" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={toggleModal} style={{ marginTop: 20 }}>
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
