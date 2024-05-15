import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Background = ({children}:any) => {
  return (
    <View>
        <ImageBackground
        source={require('../../assets/bg/bgImg.jpg')}
        style={{height:'100%'}}
        />
          
        <View style={{position:'absolute'}}>
            {children}
        </View>
     
    </View>
  )
}

export default Background

const styles = StyleSheet.create({})