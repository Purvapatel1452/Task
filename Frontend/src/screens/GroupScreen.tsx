// import { Alert, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import { UserType } from '../../UserContext'
// import GroupBox from '../components/GroupBox'
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// const GroupScreen = () => {

//   const [groupList,setGroupList]=useState([])
// const {userId,setUserId}=useContext(UserType)
// const [showModal,setShowModal]=useState(false)
// const [groupName,setGroupName]=useState('')
// const [groupDescription,setGroupDescription]=useState('')
// const [friendList,setFriendList]=useState([])
// const [selectedFriends,setSelectedFriends]=useState([])

// console.log("groupId",userId)


// const handleModel=async()=>{

//   setShowModal(true)

//   try{

//     const response=await fetch(`http://10.0.2.2:8000/chat/user/accepted-friends/${userId}`)
//     const data=await response.json()

//     if(response.ok){
//       setFriendList(data)


//     }

//   }
//   catch(error){
//     console.log("internal server problem",error)
  
//   }

// }
// console.log("FRiend list",friendList)

// const handleSelection=(friendId)=>{
//   if(selectedFriends.includes(friendId)){
//     setSelectedFriends(selectedFriends.filter((id)=>id!==friendId))
//   }else{
//     setSelectedFriends([...selectedFriends,friendId])
//   }

// }


// useEffect(()=>{

//   const userGroups=async()=>{
// try{  
//     const response=await fetch(`http://10.0.2.2:8000/chat/group/groups/${userId}`)
   
//     const data=await response.json();
   

//     if(response.ok){
//       setGroupList(data)
//     }
//   }
//   catch(error){
//     console.log("Error in internal sever",error)
//   }
// }

// userGroups()

// },[])



//   return (
//     <ScrollView style={styles.scrollContainer}>
 
//       <Pressable>
//         {
//           groupList.map((item,index)=>
//           <GroupBox key={index} item={item} />
//           )
//         }
        
//       </Pressable>
     
//       <View style={styles.container}>
//       <TouchableOpacity 
//       style={styles.buttonContainer}
//       onPress={()=>handleModel()}
//       >
      
//         <AntDesign name='addusergroup' size={22} color={'gray'}/>
//         <Text style={styles.buttonText}>Create new group</Text>
       
        
//       </TouchableOpacity>
//     </View>
    
//     <TouchableOpacity style={styles.buttonContainer1}>
      
//         <MaterialIcons name='notes' size={22} color={'white'}/>
//         <Text style={styles.buttonText1}>Add expense</Text>
       
        
//       </TouchableOpacity>

//       <Modal
//       animationType='fade'
//       transparent={true}
//       visible={showModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TextInput
//             style={styles.input}
//             placeholder='Group Name'
//             value={groupName}
//             onChangeText={setGroupName}
//             />
//             <TextInput
//             style={[styles.input,styles.textArea]}
//             placeholder='Group Description'
//             multiline
//             numberOfLines={4}
//             value={groupDescription}
//             onChangeText={setGroupName}
//             />
//             <Text style={styles.label}>Select Friends:</Text>
//             <FlatList 
//             data={friendList}
//             renderItem={({item})=>(
//               <TouchableOpacity
//               style={styles.friendItem}
//               onPress={()=>handleSelection(item._id)}
//               >
//                 <View style={styles.pressableContainer}>
//                 <Image source={{uri:item.image}} style={styles.image}/>
//                 <View style={styles.textContainer}>
//                 <Text style={styles.textName}>{item.name}</Text>
//                 <Text style={styles.textLast}>{item.email} </Text>
//                 </View>
//                 <View >
            
//         </View>

//                 </View>
                
               
//               </TouchableOpacity>
//             )}
//             keyExtractor={(item)=>item.id}

//             />
//             <TouchableOpacity style={styles.saveButton}>
//               <Text style={styles.saveButtonText}>Create Group</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//             style={styles.closeButton}
//             onPress={()=>setShowModal(false)}
//             >
//               <Text style={styles.closeButtonText}>Cancel</Text>
//             </TouchableOpacity>


//           </View>
//         </View>

//       </Modal>
    

     

//     </ScrollView>
//   )
// }

// export default GroupScreen

// const styles = StyleSheet.create({
//   scrollContainer:{

//     flex:1,
    

//   },

//   container: {
  
//     justifyContent: 'center',
//     alignItems: 'center',
    
    

//   },

 
//   buttonContainer: {
//     borderWidth:2,
//     justifyContent:'center',
//     borderColor:'gray',
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     marginVertical: 20,
//     flexDirection:'row',
//     width:230,
    
//   },
//   buttonContainer1: {
//     borderWidth:2,
//     justifyContent:'center',
//     borderColor:'gray',
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderRadius: 50,
//     marginVertical: 10,
//     flexDirection:'row',
//     width:150,
//     marginTop:245,
//     marginLeft:240,
//     backgroundColor:'gray',
//     shadowColor:'black',
//     shadowOpacity:20,
//     elevation:8
    
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'gray',
//     textAlign: 'center',
//     marginLeft:6
//   },
//   buttonText1: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'white',
//     textAlign: 'center',
//     marginLeft:6
//   },


//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     width: '90%',
//     maxHeight: '100%',
    
//    },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   textArea: {
//     height: 100,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   friendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   checkbox: {
//     height: 24,
//     width: 24,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkedCircle: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: '#007bff',
//   },
//   saveButton: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   closeButton: {
//     backgroundColor: '#dc3545',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },


//   pressableContainer:{

//     flexDirection:"row",
//     alignItems:"center",
//     gap:10,
//     borderWidth:0.9,
//     borderLeftWidth:0,
//     borderRightWidth:0,
//     borderTopWidth:0,
//     borderColor:"#D0D0D0",
//     padding:10,




// },
// image:{
//     height:50,
//     width:50,
//     borderRadius:25,
//     resizeMode:"cover"

// },
// textContainer:{
//     flex:1

// },
// textName:{

//     fontWeight:"500",
//     fontSize:15,
//     color:"black"

// },
// textLast:{
//     color:"gray",
//     fontWeight:"500"

// },
// textTime:{

//     fontSize:13,
//     fontWeight:"500",
//     color:"#585858"

// }
// })









import { Alert, FlatList, Image, Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { UserType } from '../../UserContext'
import GroupBox from '../components/GroupBox'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderBar from './HeaderBar'
import axios from 'axios'
import Background from '../components/Background'
import { useDispatch, useSelector } from 'react-redux'
import { GROUP_DATA, friend_List} from '../redux/actions/homeActions'
import User from '../components/User'


const GroupScreen = () => {
  const [groupList, setGroupList] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [msgVisible,setMsgVisible]=useState(false);
  const dispatch = useDispatch();
  const groupData = useSelector((state:any) => state.home.groupData);
// const UserId=useSelector((state:any)=>state.home.UserId)
const {data,loading,error}=useSelector(state=>state.home)
const navigation=useNavigation()
  console.log("groupId", userId);

 

  const handleCreateGroup=async()=>{

    try{

      console.log({groupName,groupDescription})

      const groupData={
        name:groupName,
        description:groupDescription,
        members:[...selectedFriends,userId]
      }

      const response=await axios.post('http://10.0.2.2:8000/chat/group/createGroup',groupData)
      console.log("FF")
      console.log(response)
      
     
     
      if(response){
        console.log("OKKK")
        Alert.alert('Group Created Successfully !')
        setShowModal(false)
        setGroupName('')
        setGroupDescription('')
        setSelectedFriends([])

      }
     
      userGroups()

    }
    catch(error){
      Alert.alert('Group Already Exists with same Name and Members !')
      console.log("ERROR in creating group internal error",error)
    }

  }

  const handleModel = async () => {
    setShowModal(true);
    try {
      // const response = await fetch(`http://10.0.2.2:8000/chat/user/accepted-friends/${userId}`);
      // const data = await response.json();
      // if (response.ok) {
      //   dispatch({
      //     type:USERID,
      //     payload:data
      //   })
      //   console.log("++",UserId,"__")
        
      //   setFriendList(UserId);
    //    useEffect(()=>{
    //  console.log("DISPATCH")
    //     dispatch(friend_List(userId))
    //    })
    
console.log(data,"__")
      if(loading){
        console.log("1")
        return <View><Text>Loading...</Text></View>
      }
      if(error){
        console.log("2")
        return <View><Text>Error:{error}</Text></View>
      }

    
      // return (
      //   <View>
      //     {
      //       data.map(item=>(

      //         <View key={item.id}>
      //           <Text>---</Text>
      //         <Text>{item.groupName}</Text>
      //         </View>

      //       ))
      //     }

      //   </View>
       
      // )
        
      }
     catch(error) {
      console.log("internal server problem", error);
    }
  };

  const handleSelection = (friendId) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };
  const userGroups = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8000/chat/group/groups/${userId}`);
      const data = await response.json();
      
      if (response.ok) {
        dispatch({
          type:GROUP_DATA,
          payload:data,
        })
        setGroupList(data);
      
      }
    } catch (error) {
      console.log("Error in internal sever", error);
    }
  };
  useEffect(() => {
   
    userGroups();
    dispatch(friend_List(userId))
    console.log(data,"___")
    console.log('use')
  }, []);

  return (

    <View style={{flex:1,backgroundColor:'#f8f8f8'}}>
         
  
      <StatusBar backgroundColor={'#D77702'} />

      <HeaderBar title={"HomeScreen"} />
    

      
     
  
     <ScrollView style={styles.scrollContainer}>
     
       <Pressable>
         {groupList.map((item, index) =>
           <GroupBox key={index} item={item} 
           />)}
       </Pressable>
       <View style={styles.container}>
         <TouchableOpacity style={styles.buttonContainer} onPress={handleModel}>
           <AntDesign name='addusergroup' size={22} color={'#D77702'} />
           <Text style={styles.buttonText}>Create new group</Text>
         </TouchableOpacity>
       </View>
     
       </ScrollView>
       <TouchableOpacity style={{position:'relative'}}>
        <View style={styles.buttonContainer1}>
         <MaterialIcons name='notes' size={22} color={'white'} />
         <Text style={styles.buttonText1}>Add expense</Text>
         </View>
       </TouchableOpacity>
      
      
    
   
       <Modal animationType='fade' transparent={true} visible={showModal}>
         <View style={styles.modalContainer}>
           <View style={styles.modalContent}>
             <TextInput style={styles.input} placeholder='Group Name' value={groupName} onChangeText={setGroupName} />
             <TextInput style={[styles.input, styles.textArea]} placeholder='Group Description' multiline numberOfLines={4} value={groupDescription} onChangeText={setGroupDescription} />
             <Text style={styles.label}>Select Friends:</Text>
             <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.friendItem} onPress={() => handleSelection(item._id)}>
                  <View style={styles.pressableContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.textContainer}>
                      <Text style={styles.textName}>{item.name}</Text>
                      <Text style={styles.textLast}>{item.email}</Text>
                    </View>
                    <View style={styles.checkbox}>
                      {selectedFriends.includes(item._id) && <View style={styles.checkedCircle} /> }
                    </View>
                    <View />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
            />
            <TouchableOpacity 
            style={styles.saveButton}
            onPress={()=>handleCreateGroup()}
            >
              <Text style={styles.saveButtonText}>Create Group</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
  
     
      
    </View>
  
   
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    marginBottom:50
   
  },
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
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D77702',
    textAlign: 'center',
    marginLeft: 6,
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
});

export default GroupScreen;
