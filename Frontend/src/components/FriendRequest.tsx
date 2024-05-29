import React, { useContext } from 'react';

import {Pressable, StyleSheet, Text, View, Image} from 'react-native';

import ChatScreen from '../screens/ChatScreen';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';



interface FriendRequestProps{
    item:any,
    friendRequest:any,
    setFriendRequest:any,
    navigation:any
}

const FriendRequest:React.FC<FriendRequestProps> = ({item, friendRequest, setFriendRequest}) => {
     
    const navigation=useNavigation()
    const {userId}=useSelector(state=>state.user)
    const acceptRequest=async(friendRequestId:any)=>{

        try{

            const response=await fetch("http://10.0.2.2:8000/chat/user/friend-request/accept",{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify({
                    senderId:friendRequestId,
                    recepientId:userId
                })
            })

            console.log("RESPONSE",response)
            if(response.ok){
                console.log(response.ok)
                console.log("rEQID",friendRequestId)

                setFriendRequest(friendRequest.filter((request:any)=>
                    request._id!=friendRequestId
                ))
             navigation.navigate("Chats")

            }

            

        }
        catch(err){
            console.log("FRONT",err)

        }

    }


  return (
    <Pressable style={styles.pressableContainer}>
      <Image
        source={{uri: item.image}}
        style={{width: 50, height: 50, borderRadius: 25}}
      />
      <Text style={styles.text}>{item?.name} sents you a Friend Request</Text>

      <Pressable
      onPress={()=>acceptRequest(item._id)}
        style={{
          backgroundColor: '#0066b2',
          borderRadius: 6,
          padding: 10,
          marginHorizontal:10
          
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text:{

    fontWeight:"bold",
    color:"black",
    fontSize:15,
    marginLeft:16,
    flex:1

  }
});
