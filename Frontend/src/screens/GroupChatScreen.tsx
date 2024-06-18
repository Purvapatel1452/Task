import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';

import {
  ActivityIndicator,
  Alert,
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../redux/slices/chatSlice';
import { fetchGroupData, fetchGroupExpenses } from '../redux/slices/groupSlice';
import storage from '@react-native-firebase/storage';
import Modal from 'react-native-modal';
import { BASE_URL } from '@env';
import HeaderChatBar from '../components/HeaderChatBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

const GroupChatScreen = ({navigation}: any) => {
  console.log(BASE_URL)
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);

  const route = useRoute();
  const {groupId}: any = route.params;
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const scrollViewRef = useRef(null);
  
  const [isExpense,setIsExpense]=useState(true)
  const [expenseList,setExpenseList]=useState([])


  const dispatch=useDispatch();
  const {userId}=useSelector(state=>state.auth)
  const {messages,loading,error}=useSelector((state)=>state.chat)
  const {groupExpenses,groupData,loading:expenseLoading,error:expenseError}=useSelector((state)=>state.group)
  

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };


  const isexpense=()=>{
    setIsExpense(true);
  }

  const isChat=()=>{
    setIsExpense(false)
  }



  // const groupExpenses=async()=>{
  //   try{

  //     const response= await axios.get(`http://10.0.2.2:8000/chat/expense/groupExpenses/${groupId}`);

   

  //     setExpenseList(response.data)

      

  //   }
  //   catch(error){
  //     console.log("internal server error",error);

  //   }
  // }



  
  // const groupExpense=async()=>{
  //   try{

  //     dispatch(fetchGroupExpenses({groupId}))

  //   }
  //   catch(error){
  //     console.log("internal server error",error);

  //   }
  // }






  // const fetchMessages = async () => {
  //   try {
  //     console.log('p');
  //     console.log("GRPISS",groupId)
      
  //     // console.log(userId,recepientId)


  //     const msgData={
  //       senderId:userId,
  //       groupId:groupId

  //     }


  //     const response = await fetch(`http://10.0.2.2:8000/chat/message/messages`,{
  //       method:'POST',
  //       headers:{
  //         'Content-Type':'application/json',
  //       },
  //       body:JSON.stringify(msgData)
  //     });
  //     console.log('DRRR', response);
  //     const data = await response.json();

  //     console.log('FFFF', data);

  //     if (response.ok) {
  //       setMessages(data);
  //     } else {
  //       console.log('error in showing message', response.status);
  //     }
  //   } catch (err) {
  //     console.log('error in fetching msg', err);
  //   }
  // };



  
  // const fetchMessage = async () => {
  //   try {
  //     console.log('p');
  //     console.log("GRPISS",groupId)

  //     dispatch(fetchMessages({userId,groupId}))
    

    
  //   } catch (err) {
  //     console.log('error in fetching msg', err);
  //   }
  // };



  useEffect(() => {
    dispatch(fetchMessages({userId,groupId}));
    dispatch(fetchGroupExpenses(groupId))
    dispatch(fetchGroupData(groupId))
  }, [dispatch,userId,groupId]);

  // useEffect(() => {
  //   const fetchGroupData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://10.0.2.2:8000/chat/message/group/${groupId}`,
  //       );

  //       const data = await response.json();
      
  //       setGroupData(data);
  //     } catch (err) {
  //       console.log('error in frontend', err);
  //     }
  //   };

  //   // const fetchRecepientData = async () => {
  //   //   try {
  //   //     const response = await fetch(
  //   //       `http://10.0.2.2:8000/chat/message/user/${}`,
  //   //     );

  //   //     const data = await response.json();
  //   //     console.log("RECE",data,"'''''")
  //   //     setGroupData(data);
  //   //   } catch (err) {
  //   //     console.log('error in frontend', err);
  //   //   }
  //   // };

  //   fetchGroupData();
   
  // }, []);
  // useEffect(() => {
  //  dispatch(fetchGroupData(userId))
   
  // }, []);

//   const handleSend = async (messageType: any, imageUri: any) => {
//     try {
//       console.log("SENNDD")
//       const formData = new FormData();

//       formData.append('senderId', userId);
//       formData.append('groupId', groupId);

//       //check msg type image or text
//       console.log('IIIII', imageUri);
//       if (messageType == 'image') {
//         formData.append('messageType', 'image');
//         formData.append('imageFile', {
//           uri: imageUri,
//           name: 'image.jpg',
//           type: 'image/jpeg',
//         });
//       } else {
//         console.log("1111",)
//         formData.append('messageType', 'text');
//         formData.append('messageText', message);
//       }
// console.log(formData,"!!!!!!y")
//       const response = await fetch(
//         'http://10.0.2.2:8000/chat/message/sendMessages',
//         {
//           method: 'POST',
//           body: formData,
//         },
//       );
//       console.log("textRes",response,"OOOOOOOOOOOO")

//       if (response.ok) {
//         setMessage('');
//         setSelectedImage('');
//       }

//       fetchMessage();
//     } catch (err) {
//       console.log('error in sending msg', err);
//     }
//   };



const scrollToBottom = () => {
    
  setTimeout(()=>{
 
     scrollViewRef.current?.scrollToEnd({ animated: true });
 
    },800)
 
   }


//MODIFIED
// const handleSend = async (messageType: any, imageUri: any) => {
//   try {
//     console.log("SENNDD")
  
//     const formData = new FormData();


//     formData.append('senderId', userId);
//     formData.append('groupId', groupId);

//     //check msg type image or text
   
//     if (messageType == 'image') {
//       const {uri}=imageUri

//       const filename = uri.substring(uri.lastIndexOf('/') + 1);
//       const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

//       console.log(uploadUri,"LLLL")
  
//       const task = storage().ref(`chat/${filename}`).putFile(uploadUri);
//       console.log(task,"TASKKK")
      

//       try {
//         await task;
//         const url = await storage().ref(`chat/${filename}`).getDownloadURL();

//   console.log(url,"URLRLRL")
//   console.log(uri,"URIIIR")
//         // const response=await axios.post("http://10.0.2.2:8000/chat/user/uploadImage",{userId,imageUrl:url})

//         formData.append('messageType', 'image');
//         formData.append('imageFile', {
//           uri: url,
//           name: 'image.jpg',
//           type: 'image/jpeg',
//         });
//   // if(response){
//   //       Alert.alert('Photo uploaded!');
       
//   // }
      
//       } catch (e) {
//         console.error(e);
//       }
  
   

//     } else {
//       console.log("1111",)
//       formData.append('messageType', 'text');
//       formData.append('messageText', message);
//     }

   
//    dispatch(sendMessage({formData}))
//     .then((response)=>{

//       console.log(response,"))))))")

// })

  
// dispatch(fetchMessages({userId,groupId:groupId}))
   
//       setMessage('');
//       setSelectedImage('');

        
//       scrollToBottom()

//   } catch (err) {
//     console.log('error in sending msg', err);
//   }
// };



 
const handleSend = async (messageType: any, imageUri: any) => {
  try {
    console.log("SENNDD")
  
 



    //check msg type image or text
    let formData={}
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

  console.log(url,"URLRLRL")
  formData={
    senderId:userId,
    groupId:groupId,
    messageType:messageType,
    messageText:message,
    imageUrl:url
  }

  console.log("IIIOOPPP",formData)
       
  
      
      } catch (e) {
        console.error(e);
      }
  
   

    } else {
      console.log("1111",)
      formData={
        senderId:userId,
        groupId:groupId,
        messageType:messageType,
        messageText:message,
        imageUrl:null
      }
    }

    console.log({formData})
   
   dispatch(sendMessage({formData}))
    .then((response)=>{

      console.log(response,"))))))")

})


if (messageType == 'image') {

  setTimeout(() => {
    dispatch(fetchMessages({userId,groupId:groupId}))
    
  }, 2000);

}else{
  setTimeout(() => {
    dispatch(fetchMessages({userId,groupId:groupId}))
    
  }, 1000);

}

   
      setMessage('');
      setSelectedImage('');

        
      scrollToBottom()

  } catch (err) {
    console.log('error in sending msg', err);
  }
};

  const formatTime = (time: any) => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
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

  // const pickImage = async () => {
  //   await ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   })
  //     .then(image => {
  //       console.log('IIIOOPP', image.path);
  //       handleSend('image', image.path);
  //     })
  //     .catch(err => {
  //       console.log('Error in uploading image', err);
  //     });
  // };

  
  const pickImage = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log('IIIOOPP', image.path);
        const source={uri:image.path}
        handleSend('image', source);
      })
      .catch(err => {
        console.log('Error in uploading image', err);
      });
  };

  const pickCamera = async() => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('IIIOOPP', image.path);
        const source={uri:image.path}
        handleSend('image', source);
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (<SafeAreaView style={{flex:1}}>
    <HeaderChatBar title={'GroupChatScreen'} id={groupId} />

    <View style={styles.pressableContainer}>
    <View style={styles.pressableContainer1}>
    <TouchableOpacity onPress={()=>isexpense()}>
    <Text  style={{color:'black'}}>Expenses</Text>
  </TouchableOpacity>
  </View>
  <View style={styles.pressableContainer2}>
    <TouchableOpacity onPress={()=>isChat()}>
    <Text style={{color:'black'}}>Chat</Text>
  </TouchableOpacity>
  </View>
    </View>
    {
      isExpense?
      <ScrollView>
      <Pressable>
      {expenseLoading ? (
            <ActivityIndicator />
          ) : expenseError ? (
            <Text>Error loading expenses: {expenseError}</Text>
          ) : (
            groupExpenses.map((item, index) => <ExpenseBox key={index} item={item} />)
          )}
    
    </Pressable>
    </ScrollView>
    :
    <KeyboardAvoidingView style={styles.keyboardContainer}>
      
  
    <ScrollView ref={scrollViewRef}>
     {
      messages.map((item: any, index) => {
       
        if (item.messageType == 'text') {
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
                {
                   item.senderId._id == userId
                   ?  <>
                   <Text style={styles.textMessage}>{item.message}</Text>
                   <Text style={styles.textMsgTime}>
                     {formatTime(item.timeStamp)}
                   </Text>
                   </>
                :<>
                 <Text style={styles.senderName}>
                  {item.senderId.name}
                </Text>
                <Text style={styles.textMessage}>{item.message}</Text>
                <Text style={styles.textMsgTime}>
                  {formatTime(item.timeStamp)}
                </Text>
                </>
        }
            
            </Pressable>
          );
        }
        if (item.messageType === 'image'??!loading) {
          
         const source=item.imageUrl

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
                {     item.senderId._id == userId ?
                <>
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
                   </>
                   :
                   <>
                   <Text style={styles.senderName}>
                  {item.senderId.name}
                   </Text>
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
                   </>
                }
              
              </View>
            </Pressable>
          );
        }
        else{
          return <ActivityIndicator />
        }
      })}
    </ScrollView>

    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom:60,

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
        <Entypo onPress={toggleModal} name="camera" size={24} color="gray" />

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

    }
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
   
    </SafeAreaView>
  );
};


export default GroupChatScreen;

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
    height: 350,
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
    color:'black'
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
  senderName: {
    fontSize: 11,
    textAlign: 'left',
    color: '#D77702',
    marginBottom: 5,
    fontWeight:'600'
  },
  pressableContainer:{

    flexDirection:"row",
    alignItems:"center",
    gap:10,
    borderWidth:0.9,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomWidth:1,
    borderColor:"#D0D0D0",
    padding:10,
justifyContent:'center'



},
pressableContainer1:{
flex:1,
  flexDirection:"row",
  alignItems:"center",
  gap:10,
  borderWidth:0,
  borderLeftWidth:1,
  borderRightWidth:1,
  borderBottomWidth:4,
  borderColor:"#D77702",
  padding:5,
  textAlign:'center',
  justifyContent:'center',
  
  marginTop:-5,
  height:40,

  




},
pressableContainer2:{

  flex:1,
  flexDirection:"row",
  alignItems:"center",
  gap:10,
  borderWidth:0,
  borderLeftWidth:1,
  borderRightWidth:1,
  borderBottomWidth:4,
  borderColor:"#D77702",
  padding:5,
  textAlign:'center',
  justifyContent:'center',
  
  marginTop:-5,
  height:40

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
