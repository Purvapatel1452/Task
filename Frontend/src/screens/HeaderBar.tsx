import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfilePic from '../components/ProfilePic'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const HeaderBar = ({title}) => {

    const navigation=useNavigation()

    const renderIcon=()=>{

        switch(title){
            case 'TabScreen':
                return  ( 
                    <View style={styles.headerContainer}>
                <Text></Text><ProfilePic />
                </View>
                )
                case 'ChatScreen':
                        return  ( 
                            <View style={styles.headerContainer}>
                      
                       <Text style={styles.headerText}>Friends</Text>

                        <ProfilePic />
                      
                        </View>
                        )
                case 'Expense':
                return  ( 
                    <View style={styles.headerContainer}>
               <IonIcons name='arrow-back-sharp' size={28}  color={'white'} onPress={()=>navigation.goBack()} />
               <Text style={styles.headerText}>Expense</Text>
               <Text>          </Text>
                </View>
                )
                case 'Friends':
                    return  ( 
                        <View style={styles.headerContainer}>
                   <IonIcons name='arrow-back-sharp' size={28}  color={'white'} onPress={()=>navigation.goBack()} />
                 
                   <Text>          </Text>
                    </View>
                    )

                    case 'Profile':
                    return  ( 
                        <View style={styles.headerContainer}>
                   <IonIcons name='arrow-back-sharp' size={28}  color={'white'} onPress={()=>navigation.goBack()} />
                   <Text style={styles.headerText}>Profile</Text>
                   <Text>          </Text>
                    </View>
                    )
                    case 'GroupScreen':
                        return  ( 
                            <View style={styles.headerContainer}>
                      
                       <Text style={styles.headerText}>Groups</Text>

                        <ProfilePic />
                      
                        </View>
                        )
                        case 'ExpensesScreen':
                            return  ( 
                                <View style={styles.headerContainer}>
                          
                           <Text style={styles.headerText}>Expenses</Text>
    
                            <ProfilePic />
                          
                            </View>
                            )
                            case 'FriendRequest':
                                return  ( 
                                    <View style={styles.headerContainer1}>
                               <IonIcons name='arrow-back-sharp' size={28}  color={'white'} onPress={()=>navigation.goBack()} />
                             
                               <Text style={[styles.headerText,{flex:1,marginLeft:5}]}>Friend Requests</Text>
                                </View>
                                )
                                case 'AddFriends':
                                return  ( 
                                    <View style={styles.headerContainer1}>
                               <IonIcons name='arrow-back-sharp' size={28}  color={'white'} onPress={()=>navigation.goBack()} />
                             
                               <Text style={[styles.headerText,{flex:1,marginLeft:5}]}>Add Friends</Text>
                                </View>
                                )
                       
        }

    }
    return (renderIcon() )
    }

    export default HeaderBar
    
    const styles=StyleSheet.create({
        headerContainer:{
            backgroundColor:'#D77702',

            padding:20,
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
        headerContainer1:{
            backgroundColor:'#D77702',

            padding:20,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            borderBottomWidth:1,
            borderBottomStartRadius:1,
            borderBottomEndRadius:1,
            borderColor:'silver',
            shadowColor:'black',
            shadowOpacity:2,
            elevation:10,
            
        },
        headerText:{
            color:"white",
            fontSize:30,
            fontWeight:'500'
            
        }
    
    })
    
    
    
