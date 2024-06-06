import React, { useContext,useEffect,useState } from 'react'

import { Pressable, StyleSheet, Text, View,Image, Alert } from 'react-native'

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { checkFriendRequest, resetRequestSent, sendFriendRequest } from '../redux/slices/friendSlice'
import { current } from '@reduxjs/toolkit'


const User = ({item}:any) => {

    const dispatch=useDispatch()
    const {userId}=useSelector(state=>state.auth)
    const { requestSent, loading, error } = useSelector(state => state.friend);


  
    // const [requestSent,setRequestSent]=useState(false)



    // useEffect(() => {
    //     const checkRequest = async () => {
    //         try {
    //             const response = await axios.get(`http://10.0.2.2:8000/chat/user/userDetails/${userId}`);
    //             const currentUser = response.data;
    //             console.log(currentUser)
    //             // Check if the item._id exists in the sentFriendRequests array
    //             const isRequestSent = currentUser.sentFriendRequests.includes(item._id);
                
    //             setRequestSent(isRequestSent);
    //         } catch (err) {
    //             console.log('Error fetching user data', err);
    //         }
    //     };

    //     checkRequest();
    // }, []);
    useEffect(() => {
        if (userId) {
         
          dispatch(checkFriendRequest({userId,item}));
        }
    
        // Reset requestSent state when component unmounts
        // return () => {
        //   dispatch(resetRequestSent());
        // };
      }, [dispatch, userId]);
    

    // const sendFriendRequest=async(currentUserId: any,selectedUserId: any)=>{

    //     try{
    //         console.log("current",currentUserId)
    //         console.log("SELECT",selectedUserId)

    //         // const response=await fetch("http://10.0.2.2:8000/friend-request",{
    //         //     method:"POST",
    //         //     headers:{
    //         //         "ContentType":"application/json",
    //         //     },
    //         //     body:JSON.stringify({currentUserId,selectedUserId})
    //         // })

    //         const response=await axios.post("http://10.0.2.2:8000/chat/user/friend-request",{currentUserId,selectedUserId})
    //         console.log("RES",response)
    //         console.log("rrrr",response)

    //         if(response){

    //             setRequestSent(true)
                
    //         }



    //     }
    //     catch(err){

    //         console.log("Error in handling send Request",err)

    //     }




    // }


//    dispatch(sendFriendRequest({ currentUserId, selectedUserId }))
 


   const sendFriendRequests=async({userId})=>{

        try{
           
            dispatch(sendFriendRequest({ currentUserId:userId, selectedUserId:item._id }))


        }
        catch(err){

            console.log("Error in handling send Request",err)

        }




    }


  
 
  return (
    <Pressable  style={styles.pressableContainer} >
    <View>

        <Image style={styles.image}
            source={{uri:item.image}} />

          

      
    </View>
    <View style={styles.textContainer}>
    <Text style={styles.textName}>{item?.name}</Text>
    <Text style={styles.textEmail}>{item?.email}</Text>


    </View>

    {

        requestSent?
        <Pressable 
        style={styles.pressAddFrnd1}
        onPress={()=>{
            console.log("request sent",userId)
            Alert.alert('Request Already Sent !!!')}}>
            <Text style={styles.textAdd1} >Request Sent</Text>
        </Pressable>
        :
        <Pressable 
        style={styles.pressAddFrnd}
        onPress={()=>{
            console.log("request sent",userId)
            sendFriendRequests({userId})}}>
            <Text style={styles.textAdd} >Add Friend</Text>
        </Pressable>


    }

   
    </Pressable>
  )
}

export default User

const styles = StyleSheet.create({
    pressableContainer:{
        flexDirection:'row',alignItems:"center",marginVertical:10

    },
    image:{
        width:50,
        height:50,
        borderRadius:25,
        resizeMode:'cover'
    },
    textContainer:{
        marginLeft:12,
        flex:1
    },
    textName:{
        fontWeight:"bold",
        color:"black",
        fontSize:15

    },
    textEmail:{
        color:"gray",
        marginTop:4,
        

    },
    pressAddFrnd:{

        backgroundColor:"#567189",
        padding:10,
        borderRadius:8,
        width:105

    },
    pressAddFrnd1:{

        backgroundColor:"#8BC34A",
        padding:10,
        borderRadius:8,
        width:105

    },
    textAdd:{
        color:"white",
        textAlign:"center",
        fontSize:13
    },
    textAdd1:{
        color:"white",
        textAlign:"center",
        fontSize:13
    }
})