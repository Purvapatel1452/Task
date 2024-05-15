
import React, { useState } from 'react'

import axios from 'axios'

import { 
    KeyboardAvoidingView, 
    Pressable,
    StyleSheet, 
    Text, 
    TextInput, 
    View,
    Alert, 
    Button
       } from 'react-native'

interface RegisterScreenProps{
    navigation:any
}

const RegisterScreen:React.FC<RegisterScreenProps> = ({navigation}) => {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [image,setImage]=useState('')


const handleRegister = async() => {
    // Create a user object with the current state values
    const user = {
        name: name,
        email: email,
        password: password,
        image: image,
    };

    // Log the user object for debugging
    // console.log("User data:", user);

    // Send a POST request to the backend API for user registration
    await axios.post("http://192.168.2.122:8000/chat/user/register", user)
        .then((response) => {
            // Handle successful registration
            console.log("Registration response:", response);
            Alert.alert(
                "Registration Success",
                "You have registered successfully."
            );
            // Reset state variables after successful registration
            setName('');
            setEmail('');
            setPassword('');
            setImage('');
        })
        .catch((error) => {
            // Handle registration failure
            console.log("Registration error:", error);
            Alert.alert(
                "Registration Failed",
                "Registration failed. Please try again later."
            );
        });
};

// const handleRegister = async () => {
//     try {
//         const user = { name, email, password, image };
//         console.log("User data:", user);
//         const response = await axios.post("http://192.168.2.122:8000/register", user);
//         console.log("Registration response:",response);
//         Alert.alert("Registration Success", "You have registered successfully.");
//         setName('');
//         setEmail('');
//         setPassword('');
//         setImage('');
//     } catch (error) {
//         console.log("Registration error:", error);
//         Alert.alert("Registration Failed", "Registration failed. Please try again later.");
//     }
// };


  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView>
      <View style={styles.headingContainer}>
      <Text style={styles.registerText}>Register</Text>

      <Text style={styles.desc}>Register Your Account</Text>
      </View>

      <View style={styles.container}>


      <View>
        <Text style={styles.nameText}>Name</Text>

        <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={(text)=>{setName(text)}}
        placeholder='Enter Your Name'
        />

       </View>

        <View>
        <Text style={styles.emailText}>Email</Text>

        <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={(text)=>{setEmail(text)}}
        placeholder='Enter Your Email Id'
        />

       </View>
       <View>
        <Text style={styles.passText}>Password</Text>

        <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        placeholder='Enter Your Password'
        />

       </View>

       <View>
        <Text style={styles.passText}>Image</Text>

        <TextInput
        style={styles.textInput}
        value={image}
        onChangeText={(text)=>{setImage(text)}}
        placeholder='Set Your Image'
        />

       <Pressable 
       style={styles.pressableLogin}
       onPress={handleRegister}
       >

       <Text style={styles.loginText}>Register</Text>

       </Pressable>

       <Pressable 
       style={styles.registerNav}
       onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.navText}>Already have an account? Sign In</Text>
       </Pressable>




      </View>

      </View>

      </KeyboardAvoidingView>

      
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:"center",
        padding:10,
        backgroundColor:"white"

    },
    headingContainer:{
        
        alignItems:"center",
        marginTop:50,
        justifyContent:'center',
    },
    registerText:{
        fontSize:24,
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
        margin:40,
        width:300

    },
    nameText:{
        fontSize:18,
        fontWeight:"600",
        color:"grey",
        marginTop:15

    },

    emailText:{
        fontSize:18,
        fontWeight:"600",
        color:"grey",
        marginTop:15
        

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
        paddingBottom:7

    },
    textInput1:{
        borderBottomWidth:2,
        borderBottomColor:'grey',
        paddingBottom:7
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