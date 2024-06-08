import { ActivityIndicator, Alert, Image, Modal, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBar from './HeaderBar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { clearUser } from '../redux/slices/authSlice'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image'
import { fetchUserDetails } from '../redux/slices/usersSlice'


const ProfileScreen = () => {

  const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [images, setImages] = useState([]);
    const [ur,setUr]=useState('')
    const [modalVisible,setModalVisible]=useState(false)
    const [load,setLoad]=useState(false)


    const navigation=useNavigation();

  const dispatch=useDispatch()
  const {userId}=useSelector(state=>state.auth)
  const {details,loading,error}=useSelector((state)=>state.users)


  const route = useRoute();
  const {data} = route.params;




 const handleLogout = async () => {
  await AsyncStorage.removeItem('authToken');
  dispatch(clearUser())
  navigation.navigate('Login');
};

useEffect(()=>{

  dispatch(fetchUserDetails(userId))

},[dispatch,userId,ur])

const selectImage = async () => {
      try {
        const image = await ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        });
        const source = { uri: image.path };
        setImage(source);
      } catch (error) {
        console.log('Error in selecting image:', error);
      }
    };

    const takePhoto = async () => {
      try {
        const image = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        });
        const source = { uri: image.path };

        setImage(source);
        
      } catch (error) {
        console.log('Error in capturing photo:', error);
      }
    };


    const uploadImage = async () => {
          if (!image) return;
      
          const { uri } = image;
          const filename = uri.substring(uri.lastIndexOf('/') + 1);
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      
          setUploading(true);
          setTransferred(0);
      
          const task = storage().ref(`user/${filename}`).putFile(uploadUri);
      
          task.on('state_changed', snapshot => {
            setTransferred(
              Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          });
      
          try {
            await task;
            const url = await storage().ref(`user/${filename}`).getDownloadURL();

            
      console.log(":")
            const response=await axios.post("http://10.0.2.2:8000/chat/user/uploadImage",{userId,imageUrl:url})

      if(response){
        setUr(url)
        // setLoad(true)
        // setTimeout(()=>{
        //   setLoad(false)
        // },1500)
    
        setUploading(false)
        setModalVisible(false)
        
          //  const resp= await firestore().collection('images').add({ url });
          //  console.log(resp,"response")
           
            
            Alert.alert('Photo uploaded!');
            setImage(null);
           
      }
          
          } catch (e) {
            console.error(e);
          }
      
       
        };

 
  return (
    <View style={styles.mainContainer}>
          <StatusBar backgroundColor={'#D77702'} />

          <HeaderBar title={"Profile"} />

          <View style={{alignItems:'center',marginTop:30}}>
          <View style={styles.contentContainer}>
         
           {loading ?
           <ActivityIndicator size={30} style={{height:190}} />
           :
           details.image ? 
           <View style={styles.imageContainer}>
           <FastImage
            source={{uri:details.image}} 
            style={styles.profileImage}
            />
                 </View>

           :
           <View style={styles.imageContainer}>
           <IonIcons name="person-outline"  size={140} style={styles.profileImage1} />
           </View>
           }
           
            <TouchableOpacity onPress={()=>setModalVisible(true)}>
            <View style={styles.add}>
              <MaterialIcons name="add-a-photo" size={20} style={{padding:8,color:"black"}} />
            </View>
            </TouchableOpacity>




            <View style={{flexDirection:'row',gap:10}}>
             <Text style={styles.name}>{details.name}</Text>
            </View>
            <View style={{flexDirection:'row',gap:3}}>
            <MaterialCommunityIcons name='email' color='gray' size={20} style={{}} />
            <Text style={{fontSize:15}}>{details.email}</Text>
            </View>
            <View style={{flexDirection:'row',gap:5,marginTop:20}}>
            <FontAwesome name='mobile' color='gray' size={25} style={{}} />
            <Text style={{fontSize:18,color:'black'}}>{details.mobile}</Text>
            </View>
        
           
            </View>

            <TouchableOpacity onPress={()=>handleLogout()} style={styles.logOutContainer}>
            <View style={{}}>
              <Text style={{color:"red", textAlign:'center',fontSize:20,fontWeight:'bold',elevation:2,shadowColor:'black',shadowOpacity:10}}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
          {   image && 
          <View >

        <Image source={{ uri: image.uri }} style={styles.imageBox} />
         </View>
          }
      {uploading ? (
         <View style={styles.modalView}>
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={260} />
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.modalButtonText}>Cancel</Text>
      </TouchableOpacity>
          </View>
          </View>
          
        ) : (
          image ? (
            <View style={styles.modalView}>
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
              <Text style={styles.buttonText}>Upload image</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
             <Text style={styles.modalButtonText}>Cancel</Text>
           </TouchableOpacity>
           </View>
           )
           :
           <View style={styles.modalView}>
           <TouchableOpacity style={styles.modalButton} onPress={selectImage}>
           <Text style={styles.modalButtonText}>Select Image</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
           <Text style={styles.modalButtonText}>Take Photo</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
           <Text style={styles.modalButtonText}>Cancel</Text>
         </TouchableOpacity>
         </View>

        )}

    
           
          </View>
        </View>
      </Modal>


    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  mainContainer:{

    flex:1,
    

  },
  contentContainer:{
    
    justifyContent:'center',
    alignItems:'center'

  },
  add:{
    borderWidth:1,
    borderRadius:40,
    height:40,
    width:40,
    backgroundColor:"silver",
    marginLeft:110,
    marginTop:-28


  },
  profileImage:{
    height:178,
    width:178,
    borderRadius:100,
    borderWidth:1,
    borderColor:'gray',


  },
  profileImage1:{
    
    height:150,
    width:170,
    borderRadius:100,
    color:"gray",
    justifyContent:"center",
    alignSelf:"center",
    marginLeft:29,
    marginTop:20

  },
  imageContainer:{
    elevation:9,
    borderRadius:100,
    shadowOpacity:10,
    shadowColor:'black',
    borderColor:"silver",
    borderWidth:1,
    height:180,
    width:180,
   backgroundColor:"#F2F2F2"

  },
  name:{
    color:'black',
    fontSize:30,
    marginTop:20,
    fontWeight:'bold'

  },
  logOutContainer:{
  marginTop:220,
  elevation:2,
  shadowColor:'black',
  shadowOpacity:10,
  borderWidth:2,
  padding:20,
  width:380,
  borderColor:'white',
  backgroundColor:'white',
  borderRadius:20
  
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: '#D77702',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius:120

  },
  uploadButton: {
        borderRadius: 5,
        width: 180,
        height: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },

})











// import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// import HeaderBar from './HeaderBar'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { useNavigation, useRoute } from '@react-navigation/native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { clearUser } from '../redux/slices/authSlice'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import React, { useEffect } from 'react';
// import { View, Button, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';

// import { utils } from '@react-native-firebase/app';
// import storage from '@react-native-firebase/storage';




















// import React, { useState } from 'react';
// import {
//   View,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   Alert,
//   Image
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import storage from '@react-native-firebase/storage';
// import * as Progress from 'react-native-progress';


// export default function UploadScreen() {
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [transferred, setTransferred] = useState(0);
  

//   const selectImage = async() => {
//     // const options = {
//     //   maxWidth: 2000,
//     //   maxHeight: 2000,
//     //   storageOptions: {
//     //     skipBackup: true,
//     //     path: 'images'
//     //   }
//     // };
//     // ImagePicker.showImagePicker(options, response => {
//     //   if (response.didCancel) {
//     //     console.log('User cancelled image picker');
//     //   } else if (response.error) {
//     //     console.log('ImagePicker Error: ', response.error);
//     //   } else if (response.customButton) {
//     //     console.log('User tapped custom button: ', response.customButton);
//     //   } else {
//     //     const source = { uri: response.uri };
//     //     console.log(source);
//     //     setImage(source);
//     //   }
//     // });
//     await ImagePicker.openPicker({
//       maxWidth: 2000,
//         maxHeight: 2000,
//         storageOptions: {
//           skipBackup: true,
//           path: 'images'
//         },
//       cropping: true,
//     })
//       .then(image => {
//         // console.log('IIIOOPP', image.path);
//         // handleSend('image', image.path);
//         console.log(image.path)
//         const source = { uri: image.path};
//             console.log(source);
//             setImage(source);
//       })
//       .catch(err => {
//         console.log('Error in uploading image', err);
//       });
//   };
//   const uploadImage = async () => {
//     const { uri } = image;
//     const filename = uri.substring(uri.lastIndexOf('/') + 1);
//     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
//     setUploading(true);
//     setTransferred(0);
//     const task = storage()
//       .ref(filename)
//       .putFile(uploadUri);
//     // set progress state
//     task.on('state_changed', snapshot => {
//       setTransferred(
//         Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
//       );
//     });
//     try {
//       await task;
//     } catch (e) {
//       console.error(e);
//     }
//     setUploading(false);
//     Alert.alert(
//       'Photo uploaded!',
//       'Your photo has been uploaded to Firebase Cloud Storage!'
//     );
//     setImage(null);
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
//         <Text style={styles.buttonText}>Pick an image</Text>
//       </TouchableOpacity>
//       <View style={styles.imageContainer}>
//         {image !== null ? (
//           <Image source={{ uri: image.uri }} style={styles.imageBox} />
//         ) : null}
//         {uploading ? (
//           <View style={styles.progressBarContainer}>
//             <Progress.Bar progress={transferred} width={300} />
//           </View>
//         ) : (
//           <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
//             <Text style={styles.buttonText}>Upload image</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#bbded6'
//   },
//   selectButton: {
//     borderRadius: 5,
//     width: 150,
//     height: 50,
//     backgroundColor: '#8ac6d1',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   uploadButton: {
//     borderRadius: 5,
//     width: 150,
//     height: 50,
//     backgroundColor: '#ffb6b9',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold'
//   },
//   imageContainer: {
//     marginTop: 30,
//     marginBottom: 50,
//     alignItems: 'center'
//   },
//   progressBarContainer: {
//     marginTop: 20
//   },
//   imageBox: {
//     width: 300,
//     height: 300
//   }
// });














// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   Alert,
//   Image,
//   FlatList
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import storage from '@react-native-firebase/storage';
// import firestore from '@react-native-firebase/firestore';
// import * as Progress from 'react-native-progress';

// export default function UploadScreen() {
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [transferred, setTransferred] = useState(0);
//   const [images, setImages] = useState([]);
//   const [ur,setUr]=useState('')

//   useEffect(() => {
//     fetchImages();
//   }, [1000]);

//   const fetchImages = async () => {
//     const imageList = [];
//     try {
//       const snapshot = await firestore().collection('images').get();
//       snapshot.forEach(doc => {
//         imageList.push({ id: doc.id, ...doc.data() });
//       });
//       setImages(imageList);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const selectImage = async () => {
//     try {
//       const image = await ImagePicker.openPicker({
//         width: 300,
//         height: 400,
//         cropping: true,
//       });
//       const source = { uri: image.path };
//       setImage(source);
//     } catch (error) {
//       console.log('Error in selecting image:', error);
//     }
//   };

//   const uploadImage = async () => {
//     if (!image) return;

//     const { uri } = image;
//     const filename = uri.substring(uri.lastIndexOf('/') + 1);
//     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

//     setUploading(true);
//     setTransferred(0);

//     const task = storage().ref(filename).putFile(uploadUri);

//     task.on('state_changed', snapshot => {
//       setTransferred(
//         Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );
//     });

//     try {
//       await task;
//       const url = await storage().ref(filename).getDownloadURL();
//       console.log(url,"??????????")
//       setUr(url)

//       await firestore().collection('images').add({ url });
//       Alert.alert('Photo uploaded!', 'Your photo has been uploaded to Firebase Cloud Storage!');
//       setImage(null);
//       fetchImages(); // Refresh the image list
//     } catch (e) {
//       console.error(e);
//     }

//     setUploading(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
//         <Text style={styles.buttonText}>Pick an image</Text>
//       </TouchableOpacity>
//       <View style={styles.imageContainer}>
//         {image && <Image source={{ uri: image.uri }} style={styles.imageBox} />}
//         {uploading ? (
//           <View style={styles.progressBarContainer}>
//             <Progress.Bar progress={transferred} width={300} />
//           </View>
//         ) : (
//           image && (
//             <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
//               <Text style={styles.buttonText}>Upload image</Text>
//             </TouchableOpacity>
//           )
//         )}
//       </View>
//       {/* <FlatList
//         data={images}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <Image source={{ uri: item.url }} style={styles.imageBox} />
//         )}
//       /> */}
//       <View>
//       {ur && <Image source={{ uri:ur }} style={styles.imageBox} />}
//         </View> 
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#bbded6',
//   },
//   selectButton: {
//     borderRadius: 5,
//     width: 150,
//     height: 50,
//     backgroundColor: '#8ac6d1',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   uploadButton: {
//     borderRadius: 5,
//     width: 150,
//     height: 50,
//     backgroundColor: '#ffb6b9',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   imageContainer: {
//     marginTop: 30,
//     marginBottom: 50,
//     alignItems: 'center',
//   },
//   progressBarContainer: {
//     marginTop: 20,
//   },
//   imageBox: {
//     width: 300,
//     height: 300,
//     marginVertical: 10,
//   },
// });
