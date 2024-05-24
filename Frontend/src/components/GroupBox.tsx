import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const GroupBox = ({item}) => {

    const navigation=useNavigation()

  return (
    <Pressable
    onPress={()=>navigation.navigate("GroupChat",{groupId:item._id})}
    style={styles.pressableContainer}
    >
        <Image source={{uri:item.image}} style={styles.image} />
        <View style={styles.textContainer}>
            <Text style={styles.textName}>{item.name}</Text>
            <Text style={styles.textLast}>{item.description}</Text>
        </View>
        <View>
            <Text style={styles.textTime}>{item.created_at}</Text>
        </View>

    </Pressable>
  )
}

export default GroupBox

const styles = StyleSheet.create({
    pressableContainer:{

        flexDirection:"row",
        alignItems:"center",
        gap:10,
        borderWidth:0.0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderTopWidth:0,
        borderColor:"#D0D0D0",
        padding:10,
        

    },
    image:{
        height:90,
        width:75,
        borderRadius:10,
        resizeMode:"cover"

    },
    textContainer:{
        flex:1

    },
    textName:{

        fontWeight:"500",
        fontSize:15,
        color:"black"

    },
    textLast:{
        color:"gray",
        fontWeight:"500"

    },
    textTime:{

        fontSize:13,
        fontWeight:"500",
        color:"#585858"

    }
})