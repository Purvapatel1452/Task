import React from 'react'

import { View, Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


interface GradientBGIconProps{
    name:string
    color:string
    size:number
}

const GradientBGIcon: React.FC<GradientBGIconProps> = ({name,color,size}) => {
  return (
    <View style={styles.Container}>
      <LinearGradient
      start={{x:0,y:0}}
      end={{x:1,y:1}}
      colors={['grey','black']}
      style={styles.LinearGradientBG}
      >
      {/* <CustomIcon name={name} color={color} size={size} /> */}
      <MaterialCommunityIcons name={'microsoft-xbox-controller-menu'} color={color} size={size} />

      

      </LinearGradient>
    </View>
  )
}

const styles=StyleSheet.create({
    Container:{
        borderWidth:1,
        borderColor:'grey',
        borderRadius:12,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:'grey',
        overflow:'hidden'

    },
    LinearGradientBG:{
        height:36,
        width:36,
        alignItems:'center',
        justifyContent:"center",
        
        

    }
})

export default GradientBGIcon