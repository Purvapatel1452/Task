import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../components/HeaderBar';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearUser} from '../redux/slices/authSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import {fetchUserDetails} from '../redux/slices/usersSlice';
import {BASE_URL} from '@env';
import {fetchGroupData} from '../redux/slices/groupSlice';

const ChatProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [images, setImages] = useState([]);
  const [ur, setUr] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [load, setLoad] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.auth);
  const {groupData, loading, error} = useSelector(state => state.group);

  const route = useRoute();
  const {groupId} = route.params;

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    dispatch(clearUser());
  };
  useEffect(() => {
    dispatch(fetchGroupData(groupId));
  }, [dispatch, groupId, ur]);

  const selectImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      const source = {uri: image.path};
      setImage(source);
    } catch (error) {
      console.log('Error in selecting image:', error);
    }
  };

  const takePhoto = async () => {
    try {
      console.log('CMAera');
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      const source = {uri: image.path};
      console.log(source);
      setImage(source);
    } catch (error) {
      console.log('Error in capturing photo:', error);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(`group/${filename}`).putFile(uploadUri);

    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
    });

    try {
      await task;
      const url = await storage().ref(`group/${filename}`).getDownloadURL();

      console.log(':', BASE_URL);
      const response = await axios.post(`${BASE_URL}/group/uploadGroupImage`, {
        groupId: groupData._id,
        imageUrl: url,
      });

      if (response) {
        setUr(url);

        setUploading(false);
        setModalVisible(false);

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
      <ScrollView>
        <View
          style={{
            flex: 1,
            position: 'relative',
            borderBottomWidth: 1,
            elevation: 5,
            backgroundColor: 'red',
            shadowColor: 'black',
          }}>
          <ImageBackground
            source={{uri: groupData.image}}
            style={{height: height * 0.3, width: width}}>
            <View style={styles.overlay} />
            <IonIcons
              name="arrow-back-sharp"
              size={28}
              color={'white'}
              style={styles.icon}
              onPress={() => navigation.goBack()}
            />
          </ImageBackground>
          <View style={{position: 'relative', top: -height * 0.3}}>
            <View style={styles.groupNameContainer}>
              <Text style={styles.headerText}>{groupData.name}</Text>
              <Text style={styles.desc}>{groupData.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.add}>
              <MaterialIcons
                name="add-a-photo"
                size={20}
                style={{padding: 8, color: 'black'}}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.lengthContainer}>
            <Text style={styles.memberLength}>{groupData.members.length} members</Text>
          </View>

          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <MaterialIcons
              name="person"
              color="black"
              size={20}
              style={styles.nameLogo}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{groupData.name}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="email"
              color="black"
              size={20}
              style={styles.nameLogo}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.email}>{groupData.members._id}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>
            <FontAwesome
              name="mobile"
              color="black"
              size={30}
              style={styles.mobileLogo}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>+91 {groupData.description}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleLogout()}
          style={styles.logOutContainer}>
          <View style={{}}>
            <Text
              style={{
                color: 'red',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                elevation: 2,
                shadowColor: 'black',
                shadowOpacity: 10,
              }}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {image && (
              <View>
                <Image source={{uri: image.uri}} style={styles.imageBox} />
              </View>
            )}
            {uploading ? (
              <View style={styles.modalView}>
                <View style={styles.progressBarContainer}>
                  <Progress.Bar progress={transferred} width={260} />
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : image ? (
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={uploadImage}>
                  <Text style={styles.buttonText}>Upload image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={selectImage}>
                  <Text style={styles.modalButtonText}>Select Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={takePhoto}>
                  <Text style={styles.modalButtonText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

export default ChatProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.001,
    
  },
  add: {
    borderWidth: 1,
    borderRadius: 40,
    height: 40,
    width: 40,
    borderColor: 'gray',
    elevation: 2,
    shadowColor: 'black',
    backgroundColor: 'white',
    left: height * 0.21,
    top: -height * 0.065,
    marginTop: height * 0.04,
  },
  profileImage: {
    height: height * 0.2,
    width: width * 0.4,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'gray',
  },
  profileImage1: {
    height: height * 0.2,
    width: height * 0.2,
    borderRadius: 100,
    color: 'gray',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 29,
    marginTop: 20,
  },
  imageContainer: {
    elevation: 9,
    borderRadius: 100,
    shadowOpacity: 10,
    shadowColor: 'black',
    borderColor: 'silver',
    borderWidth: 1,
    height: height * 0.2,
    width: height * 0.2,
    backgroundColor: '#F2F2F2',
    marginTop: 11,
  },
  name: {
    color: 'black',
    fontSize: 16,

    fontWeight: 'bold',
  },
  email: {
    color: 'gray',
    fontSize: 14,
  },
  nameLogo: {
    color: 'black',
    fontSize: 25,
    marginTop: height * 0.24,
    marginLeft: width * 0.04,
    fontWeight: 'bold',
  },
  mobileLogo: {
    color: 'black',
    fontSize: 30,
    marginTop: height * 0.034,
    marginRight: 6,

    fontWeight: 'bold',
    marginLeft: width * 0.06,
  },
  nameContainer: {
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: 'orange',

    shadowColor: 'black',
    backgroundColor: 'white',
    width: 100,
    marginTop: 200,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingTop: 5,

    flex: 1,
    marginRight: width * 0.09,
  },
  logOutContainer: {
    marginTop: 20,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 10,
    borderWidth: 2,
    padding: 10,
    width: 330,
    height: 50,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 20,
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
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 120,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the opacity to make the image look dull
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
  },
  groupNameContainer: {
    position: 'absolute',
    top: height * 0.015,
    left: 55,
  },
  desc: {
    position: 'relative',
    top: -height * 0.02,
    left: width * 0.002,
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    marginTop: 20,
  },
  descriptionContainer: {
    position: 'absolute',
    marginTop: -20,
    left: width * 0.074,
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    flexDirection: 'row',
    gap: -8,
  },
  lengthContainer:{
    alignSelf:"flex-start",
    left:width * 0.05,
    top:-height * 0.05,
    position:"absolute"
  },
  memberLength:{
    fontSize:20,
    fontWeight:"bold",
    color:"silver"

  }
});
