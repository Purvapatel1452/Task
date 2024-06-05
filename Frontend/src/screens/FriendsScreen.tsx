import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useDebugValue, useEffect,useState } from 'react'

import axios from 'axios'
import FriendRequest from '../components/FriendRequest'
import HeaderBar from './HeaderBar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFriendRequests } from '../redux/slices/friendSlice'

const FriendsScreen = () => {

  const dispatch=useDispatch()
  const {userId}=useSelector(state=>state.auth)
  const {friendRequests,loading,error}=useSelector((state)=>state.friend)



    const [friendRequest,setFriendRequest]=useState([])
    

    
    useEffect(()=>{

      dispatch(fetchFriendRequests(userId))

  },[])

    // useEffect(()=>{

    //     fetchFriendRequest()

    // },[])

//     const fetchFriendRequest=async()=>{

//         try{

// console.log(userId)
//             const response=await axios.get(`http://10.0.2.2:8000/chat/user/friend-request/${userId}`)
//             console.log("RESPPP",response)

//             if(response.status===200){
//                 const friendRequestsData=response.data.map((friendRequest:any)=>({

//                     _id:friendRequest._id,
//                     name:friendRequest.name,
//                     email:friendRequest.email,
//                     image:friendRequest.image

//                 }))

//                 console.log(friendRequestsData)

//                 setFriendRequest(friendRequestsData)
//             }
//         }
//         catch{

//         }

//     }
   


  return (
    <View>
      
      <HeaderBar title={'Friends'} />
      {
        friendRequests.length>0 && <Text>Your Friend Requests</Text>
      }

      {
        friendRequests.map((item,index)=>
        <FriendRequest 
            key={index}
            item={item}
            friendRequest={friendRequest}
            setFriendRequest={setFriendRequest} navigation={undefined}        />
        )
      }
    </View>
  )
}

export default FriendsScreen

const styles = StyleSheet.create({})