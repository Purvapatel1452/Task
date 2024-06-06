import React, { useContext, useDebugValue } from 'react';

import {Pressable, StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';

import ChatScreen from '../screens/ChatScreen';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest, fetchFriendRequests } from '../redux/slices/friendSlice';
import { fetchFriends } from '../redux/slices/groupSlice';



interface FriendRequestProps{
    item:any,
    friendRequest:any,
    setFriendRequest:any,
    navigation:any
}

const FriendRequest:React.FC<FriendRequestProps> = ({item, friendRequest, setFriendRequest}) => {
     
    const navigation=useNavigation()


    const {userId}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const { loading, error } = useSelector((state) => state.friend);



    // const acceptRequest=async(friendRequestId:any)=>{

    //     try{

    //         const response=await fetch("http://10.0.2.2:8000/chat/user/friend-request/accept",{
    //             method:"POST",
    //             headers:{
    //                 "Content-type":"application/json",
    //             },
    //             body:JSON.stringify({
    //                 senderId:friendRequestId,
    //                 recepientId:userId
    //             })
    //         })

    //         console.log("RESPONSE",response)
    //         if(response.ok){
    //             console.log(response.ok)
    //             console.log("rEQID",friendRequestId)

    //             setFriendRequest(friendRequest.filter((request:any)=>
    //                 request._id!=friendRequestId
    //             ))
    //          navigation.navigate("Chat")

    //         }

            

    //     }
    //     catch(err){
    //         console.log("FRONT",err)

    //     }

    // }


    const acceptRequest=async(friendRequestId:any)=>{

      try{

         dispatch(acceptFriendRequest({friendRequestId,userId}))
        //  dispatch(fetchFriendRequests(userId))
        //  dispatch(fetchFriends(userId))
           navigation.navigate("Chat")

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

        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={{ color: 'white', textAlign: 'center' }}>Accept</Text>
        )}
        {/* <Text style={{color: 'white', textAlign: 'center'}}>Accept</Text> */}
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
    padding:5,
    borderWidth:1,
    borderColor:"silver",
    borderRadius:20,
    margin:8,
    elevation:4,
    shadowColor:"black",
    shadowOpacity:10,
    backgroundColor:"white"
  },
  text:{

    fontWeight:"bold",
    color:"black",
    fontSize:15,
    marginLeft:16,
    flex:1

  }
});
