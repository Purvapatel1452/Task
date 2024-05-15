import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GradientBGIcon from '../components/GradientBGIcon'
import ProfilePic from '../components/ProfilePic'

const HeaderBar = ({title}) => {

    const renderIcon=()=>{

        switch(title){
            case 'HomeScreen':
                return  ( 
                    <View style={styles.headerContainer}>
                <GradientBGIcon name="menu" color={'gray'} size={22} /><ProfilePic />
                </View>
                )
                case 'ChatHomeScreen':
                return  ( 
                    <View style={styles.headerContainer}>
                <GradientBGIcon name="menu" color={'gray'} size={22} /><ProfilePic />
                </View>
                )
                case 'AddFriend':
                return  ( 
                    <View style={styles.headerContainer}>
                <GradientBGIcon name="menu" color={'gray'} size={22} /><ProfilePic />
                </View>
                )
        }

    }
    return (renderIcon() )
    }

    export default HeaderBar
    
    const styles=StyleSheet.create({
        headerContainer:{
            backgroundColor:'darkorange',

            padding:30,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            borderBottomWidth:1,
            borderBottomStartRadius:1,
            borderBottomEndRadius:1,
            borderColor:'silver',
            shadowColor:'black',
            shadowOpacity:2,
            elevation:10
        },
        headerText:{
            color:"#FFFFFF",
            fontSize:30,
            fontFamily:'poppins_semibold',
        }
    
    })
    
    
    
