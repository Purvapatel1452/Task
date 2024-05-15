import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View,Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../../UserContext';
interface LoginScreenProps{
    navigation:any
}


const LoginScreen:React.FC<LoginScreenProps>= ({navigation}) => {
    const {userId,setUserId}=useContext(UserType)
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


    useEffect(()=>{
        const checkLogin=async()=>{
            
            try{

                const token=await AsyncStorage.getItem("authToken");
                console.log(token)
                if(token){
                    navigation.replace('Home')
                }
                else{

                    navigation.navigate('Login')


                }
 
            }
            catch(err){

                console.log("Error:",err)

            }

        }

        checkLogin()
    },[])



    const handleLogin=async()=>{

        const user={
            email:email,
            password:password
        }
console.log(user)
    
       await axios.post("http://192.168.2.122:8000/chat/user/login", user)
        .then((response)=>{
            console.log("1sstt",response)
            const token=response.data.token;

            AsyncStorage.setItem("authToken",token);

            navigation.navigate('Home')

        })
        .catch((err)=>{

            Alert.alert("Login Error","Invalid Email or Password")
            console.log("login error:",err.response.request)
            
        })

    }

    

  return (
    
    <View style={styles.mainContainer}>
     <KeyboardAvoidingView>
      <View style={styles.headingContainer}>
      <Text style={styles.signIn}>Sign In</Text>

      <Text style={styles.desc}>Sign In to Your Account</Text>
      </View>

      <View style={styles.container}>
        <View>
        <Text style={styles.emailText}>Email</Text>

        <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={(text)=>{setEmail(text)}}
        placeholder='Enter Your Email Id'
        placeholderTextColor={"gray"}
        />

       </View>
       <View>
        <Text style={styles.passText}>Password</Text>

        <TextInput
        secureTextEntry={true}
        style={styles.textInput}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        placeholder='Enter Your Password'
        placeholderTextColor={"gray"}
        />

       </View>

       <Pressable 
       style={styles.pressableLogin}
       onPress={handleLogin}
       >

       <Text style={styles.loginText}>Login</Text>

       </Pressable>

       <Pressable 
       style={styles.registerNav}
       onPress={()=>navigation.navigate('Register')}>
        <Text style={styles.navText}>Don't have an account? Sign Up</Text>
       </Pressable>




      </View>


      </KeyboardAvoidingView>
    </View>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:"center",
        padding:10,
        backgroundColor:"white"

    },
    headingContainer:{
        
        alignItems:"center",
        marginTop:100,
        justifyContent:'center',
    },
    signIn:{
        fontSize:20,
        color:'#4A55A2',
        fontWeight:"700"
      

    },
    desc:{
        fontSize:17,
        color:'black',
        fontWeight:"600",
        marginTop:10


    },
    container:{
        margin:50,
        width:300

    },
    emailText:{
        fontSize:18,
        fontWeight:"600",
        color:"grey"
        

    },
    passText:{
        fontSize:18,
        fontWeight:"600",
        color:"grey",
        marginTop:15
        

    },
    textInput:{
        borderBottomWidth:2,
        borderBottomColor:'grey',
        paddingBottom:7,
        color:"black"

    },
    textInput1:{
        borderBottomWidth:2,
        borderBottomColor:'grey',
        paddingBottom:7,
        color:"black"
    },

    pressableLogin:{
        marginTop:25,
        backgroundColor:'#4A55A2', 
        alignItems:'center',
        width:160,
        borderRadius:12,
        padding:8,
        marginRight:'auto',
        marginLeft:'auto'
        
        },
    loginText:{

        fontSize:22,
        color:'white',
        justifyContent:'center',
       
    },
    registerNav:{
        marginTop:10,
        
    },
    navText:{
        fontSize:15,
        textAlign:'center',
        color:'grey'

    }
})