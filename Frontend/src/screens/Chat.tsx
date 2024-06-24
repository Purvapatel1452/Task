import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import  from "@react-native-firebase/storage"

const Chat=()=> {
    console.log("helloo")
    const [messages, setMessages] = useState([])

    useLayoutEffect(()=>{
        const collectionRef=collection(database,'chat')
    })
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
    }, [])
  
  return (
    
    <View>
     {/* <GiftedChat 
     messages={messages}
     onSend={messages => onSend(messages)}
     user={{
       _id: 1,
     }}
     /> */}
     <Text>hello</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
