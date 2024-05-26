import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBar from './HeaderBar'

const ProfileScreen = () => {
  return (
    <View>
          <StatusBar backgroundColor={'#D77702'} />

          <HeaderBar title={"HomeScreen"} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})