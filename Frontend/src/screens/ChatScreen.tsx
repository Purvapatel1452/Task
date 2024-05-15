import React, { useContext, useEffect, useState } from 'react'

import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { UserType } from '../../UserContext'
import UserChat from '../components/UserChat'
import HeaderBar from './HeaderBar'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'


const ChatScreen = () => {

    const [acceptedFriends,setAcceptedfriends]=useState([])
    const {userId,setUserId}=useContext(UserType)

    const navigation=useNavigation()

    useEffect(()=>{

        const acceptedFriendsList=async()=>{
            try{

                const response=await fetch(`http://10.0.2.2:8000/chat/user/accepted-friends/${userId}`)
                console.log("RP",response)
                const data=await response.json()
                console.log("DATA",data)

                if(response.ok){
                    setAcceptedfriends(data)
                }





            }catch(err){
                console.log("Error in frontend",err)

                
            }
        }

        acceptedFriendsList()

    },[])

    console.log("ACCEPTED FRIENDS",acceptedFriends)

  return (
    <View style={{flex:1,backgroundColor:'#f8f8f8'}}>
    <HeaderBar title={'ChatHomeScreen'} />
    <ScrollView>
        <Pressable>
            {acceptedFriends.map((item,index)=>

            <UserChat key={index} item={item} />
            
            )}
        </Pressable>
        <View style={styles.container}>
         <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate('Home')}>
           <AntDesign name='addusergroup' size={22} color={'#D77702'} />
           <Text style={styles.buttonText}>Add Friends</Text>
         </TouchableOpacity>
       </View>
    </ScrollView>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonContainer: {
        borderWidth: 2,
        justifyContent: 'center',
        borderColor: '#D77702',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginVertical: 20,
        flexDirection: 'row',
        width: 230,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#D77702',
        textAlign: 'center',
        marginLeft: 6,
      },
})