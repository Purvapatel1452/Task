import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'

import axios from 'axios'
import FriendRequest from '../components/FriendRequest'
import HeaderBar from './HeaderBar'
import { useSelector } from 'react-redux'

const FriendsScreen = () => {

  const {userId}=useSelector(state=>state.user)
    const [friendRequest,setFriendRequest]=useState([])
    

    useEffect(()=>{

        fetchFriendRequest()

    },[])

    const fetchFriendRequest=async()=>{

        try{

console.log(userId)
            const response=await axios.get(`http://10.0.2.2:8000/chat/user/friend-request/${userId}`)
            console.log("RESPPP",response)

            if(response.status===200){
                const friendRequestsData=response.data.map((friendRequest:any)=>({

                    _id:friendRequest._id,
                    name:friendRequest.name,
                    email:friendRequest.email,
                    image:friendRequest.image

                }))

                console.log(friendRequestsData)

                setFriendRequest(friendRequestsData)
            }
        }
        catch{

        }

    }
    console.log("FR",friendRequest)


  return (
    <View>
      
      <HeaderBar title={'AddFriend'} />
      {
        friendRequest.length>0 && <Text>Your Friend Requests!</Text>
      }

      {
        friendRequest.map((item,index)=>
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