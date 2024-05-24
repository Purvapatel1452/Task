import React, { useContext, useEffect, useState } from 'react'

import { Alert, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { UserType } from '../../UserContext'
import UserChat from '../components/UserChat'
import HeaderBar from './HeaderBar'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const ChatScreen = () => {

    const [acceptedFriends,setAcceptedfriends]=useState([])
    const {userId,setUserId}=useContext(UserType)
    const [showModal,setShowModal]=useState(false)
    const [description,setDecription]=useState('')
    const [amount,setAmount]=useState('')

    const navigation=useNavigation()

    const handleAddExpense=async()=>{
          console.log('ADDEXPEN  initiated')

          try{

            const data={

              "description":description,
              "amount":amount,
              "payerId":userId,
              "payeeId":"662f97d97b6dcecd3ff1a1d4"

            }
              const response= await  fetch("http://10.0.2.2:8000/chat/expense/addExpense",{
                method:'POST',
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
              })   

              const expense=await response.json();
              console.log("EXXPENSE",response)

              if(response.ok){
                Alert.alert("Expense Added !!!")

              }
             }
            
             catch(error){
              console.log("Error in adding expense",error)
              
             }
    }

    const handleModel=async()=>{

      console.log("MODALVIEWW")

      setShowModal(true)

     

    }

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
    <TouchableOpacity style={{position:'relative'}} onPress={handleModel}>
        <View style={styles.buttonContainer1}>
         <MaterialIcons name='notes' size={22} color={'white'} />
         <Text style={styles.buttonText1}>Add expense</Text>
         </View>
       </TouchableOpacity>


       <Modal animationType='fade' transparent={true} visible={showModal}>
         <View style={styles.modalContainer}>
           <View style={styles.modalContent}>
             <TextInput style={[styles.input, styles.textArea]} placeholder='Enter a Description' multiline numberOfLines={4} value={description} onChangeText={setDecription}/>
             <TextInput style={styles.input} placeholder='Amount' value={amount} onChangeText={setAmount} />
            <TouchableOpacity 
            style={styles.saveButton}
            onPress={()=>handleAddExpense()}
            >
              <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
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
      buttonContainer1: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: '#D77702',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 8,
      },
      buttonText1: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        marginLeft: 6,
        
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxHeight: '90%',
        borderWidth:2,
        borderColor:'gray'
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      textArea: {
        height: 100,
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      checkbox: {
        height: 24,
        width: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkedCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'gray',
      },
      saveButton: {
        backgroundColor: 'darkorange',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
      },
      saveButtonText: {
        color: '#fff',
        fontSize: 16,
      },
      closeButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
      },
      closeButtonText: {
        color: '#fff',
        fontSize: 16,
      },
      pressableContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.9,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderColor: "#D0D0D0",
        padding: 10,
      },
      image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        resizeMode: "cover",
      },
      textContainer: {
        flex: 1,
      },
      textName: {
        fontWeight: "500",
        fontSize: 15,
        color: "black",
      },
      textLast: {
        color: "gray",
        fontWeight: "500",
      },
      textTime: {
        fontSize: 13,
        fontWeight: "500",
        color: "#585858",
      },
    
      leftText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
      },
})