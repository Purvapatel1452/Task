import React from 'react'

import { View, Text, StyleSheet,Image } from 'react-native'



const ProfilePic = () => {
// const k=require('../assets/app_images/avata.png')
// const i=require('../assets/coffee_assets/liberica_coffee_beans/liberica_coffee_beans_square.png')

//   console.warn('p',i)

//   console.warn('j',k)
  return (
    <View style={styles.ImageContainer}>
      <Image 
      source={require('../../assets/bg/bgImg.jpg')} 
      style={styles.Image}
      />
    </View>
  )
}

const styles=StyleSheet.create({
    ImageContainer:{
       height:36,
       width:36,
       borderRadius:12,
       borderColor:'black',
       borderWidth:2,
       alignItems:"center",
       justifyContent:"center",
       overflow:"hidden",
       shadowColor:'black',
       shadowOpacity:22,
       elevation:15
       

    },
    Image:{
        height:36,
        width:36
      

    }
})

export default ProfilePic