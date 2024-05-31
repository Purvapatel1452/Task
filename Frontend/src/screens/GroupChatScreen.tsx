import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';

import {
  Image,
  KeyboardAvoidingView,
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
import HeaderBar from './HeaderBar';
import axios from 'axios';
import ExpenseBox from '../components/ExpenseBox';
import { useSelector } from 'react-redux';

const GroupChatScreen = ({navigation}: any) => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [messages, setMessages] = useState([]);
  const {userId}=useSelector(state=>state.user)
  const route = useRoute();
  const {groupId}: any = route.params;
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [groupData, setGroupData] = useState<any>('');
  const [isExpense,setIsExpense]=useState(true)
  const [expenseList,setExpenseList]=useState([])


  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };


  const isexpense=()=>{
    setIsExpense(true);
  }

  const isChat=()=>{
    setIsExpense(false)
  }



  const groupExpenses=async()=>{
    try{

      const response= await axios.get(`http://10.0.2.2:8000/chat/expense/groupExpenses/${groupId}`);

      console.log(response.data,")))")

      setExpenseList(response.data)

      

    }
    catch(error){
      console.log("internal server error",error);

    }
  }



  const fetchMessages = async () => {
    try {
      console.log('p');
      console.log("GRPISS",groupId)
      
      // console.log(userId,recepientId)


      const msgData={
        senderId:userId,
        groupId:groupId

      }


      const response = await fetch(`http://10.0.2.2:8000/chat/message/messages`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(msgData)
      });
      console.log('DRRR', response);
      const data = await response.json();

      console.log('FFFF', data);

      if (response.ok) {
        setMessages(data);
      } else {
        console.log('error in showing message', response.status);
      }
    } catch (err) {
      console.log('error in fetching msg', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    groupExpenses();
  }, []);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:8000/chat/message/group/${groupId}`,
        );

        const data = await response.json();
        console.log("RECE",data,"'''''")
        setGroupData(data);
      } catch (err) {
        console.log('error in frontend', err);
      }
    };

    // const fetchRecepientData = async () => {
    //   try {
    //     const response = await fetch(
    //       `http://10.0.2.2:8000/chat/message/user/${}`,
    //     );

    //     const data = await response.json();
    //     console.log("RECE",data,"'''''")
    //     setGroupData(data);
    //   } catch (err) {
    //     console.log('error in frontend', err);
    //   }
    // };

    fetchGroupData();
   
  }, []);

  const handleSend = async (messageType: any, imageUri: any) => {
    try {
      console.log("SENNDD")
      const formData = new FormData();

      formData.append('senderId', userId);
      formData.append('groupId', groupId);

      //check msg type image or text
      console.log('IIIII', imageUri);
      if (messageType == 'image') {
        formData.append('messageType', 'image');
        formData.append('imageFile', {
          uri: imageUri,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
      } else {
        console.log("1111",)
        formData.append('messageType', 'text');
        formData.append('messageText', message);
      }
console.log(formData,"!!!!!!y")
      const response = await fetch(
        'http://10.0.2.2:8000/chat/message/sendMessages',
        {
          method: 'POST',
          body: formData,
        },
      );
      console.log("textRes",response,"OOOOOOOOOOOO")

      if (response.ok) {
        setMessage('');
        setSelectedImage('');
      }

      fetchMessages();
    } catch (err) {
      console.log('error in sending msg', err);
    }
  };
  console.log('messages', messages);

 

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

  const pickImage = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log('IIIOOPP', image.path);
        handleSend('image', image.path);
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
      console.log(image);
    });
  };

  return (<>
    <HeaderBar title={'ChatScreen'} />

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
      {expenseList.map((item, index) => (
        <ExpenseBox key={index} item={item} />
      ))}
    </Pressable>
    </ScrollView>
    :
    <KeyboardAvoidingView style={styles.keyboardContainer}>
      
  
    <ScrollView>
      {messages.map((item: any, index) => {
        if (item.messageType == 'text') {
          return (
            <Pressable
              key={index}
              style={[
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
        if (item.messageType === 'image') {
          const baseUrl =
            'react native/final_demo_copy-chat/Chat-RN_App/Backend/files/';
          const imageUrl = item.imageUrl;
          console.log('IO', imageUrl);
          const filename = imageUrl.split('\\').pop();
          console.log('F', filename);
          // const source={uri:baseUrl+filename}
          const source =
            'data:image/jpeg;base64,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';

          console.log('SSS', source);

          return (
            <Pressable
              key={index}
              style={[
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
                <Image
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
        <Entypo onPress={pickImage} name="camera" size={24} color="gray" />

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
   
    </>
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
  height:40,
  





},
 
});
