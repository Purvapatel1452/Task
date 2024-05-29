import React, {useCallback, useContext, useEffect, useState} from 'react';

import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {UserType} from '../../UserContext';
import UserChat from '../components/UserChat';
import HeaderBar from './HeaderBar';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = () => {
  const [acceptedFriends, setAcceptedfriends] = useState([]);
  const {userId, setUserId} = useContext(UserType);
  const [showModal, setShowModal] = useState(false);
  const [description, setDecription] = useState('');
  const [amount, setAmount] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isGroup, setIsGroup] = useState(false);
  const [selectGroup, setSelectGroup] = useState('');
  const [select, setSelect] = useState([]);
  const [type,setType]=useState([])
  const [paymentStatus,setPaymentStatus]=useState([])
  const [groupId, setGroupId] = useState('');

  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);

  const handleFriends = async () => {
    setSelect([]);
    setSelectedFriends([]);
    setIsGroup(false);
    try {
      const response = await fetch(
        `http://10.0.2.2:8000/chat/user/accepted-friends/${userId}`,
      );
      const data = await response.json();
      console.log(data, '{{}}');
      if (response.ok) {
        // dispatch({
        //   type:USERID,
        //   payload:data
        // })
        // console.log("++",UserId,"__")

        setFriendList(data);
        //    useEffect(()=>{
        //  console.log("DISPATCH")
        //     dispatch(friend_List(userId))
        //    })

        // console.log(data,"__")
        //       if(loading){
        //         console.log("1")
        //         return (<View><Text>Loading...</Text></View>)
        //       }
        //       if(error){
        //         console.log("2")
        //         return (<View><Text>Error:{error}</Text></View>)
        //       }

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
    } catch (error) {
      console.log('internal server problem', error);
    }
  };

  const handleGroups = async () => {
    setSelectedFriends([]);
    setSelectGroup('');
    setIsGroup(true);
    try {
      const response = await fetch(
        `http://10.0.2.2:8000/chat/group/groups/${userId}`,
      );
      const data = await response.json();

      if (response.ok) {
        setFriendList(data);

    
      }
    } catch (error) {
      console.log('Error in internal sever', error);
    }
  };

  const handleAddExpense = async () => {
    console.log('ADDEXPEN  initiated', selectedFriends);

    try {
      setDecription('');
      setAmount('');
      setSelectedFriends([]);
      let data={}
if(isGroup){
        data = {
        description: description,
        amount: amount,
        payerId: userId,
        payeeId: selectedFriends,
        groupId: selectGroup,
        type:type
      };
    }
    else{
        data = {
        description: description,
        amount: amount,
        payerId: userId,
        payeeId: selectedFriends,
        type:type
      };

    }
      console.log('DAAATTAA', data);
      const response = await fetch(
        'http://10.0.2.2:8000/chat/expense/addExpense',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      const expense = await response.json();
      console.log('EXXPENSE', response);

      if (response.ok) {
        Alert.alert('Expense Added !!!');
        setShowModal(false);
        setDecription('');
        setAmount('');
        setSelectedFriends([]);
      }
    } catch (error) {
      console.log('Error in adding expense', error);
    }
  };

  const handleModel = async () => {
    console.log('MODALVIEWW');

    setShowModal(true);
  };

  const handleSelection = item => {
 
    if (isGroup) {
      setSelectedFriends(item.members);
      setSelectGroup(item._id);
      setType('group')

    } else {
      if (selectedFriends.includes(item._id)) {
        setSelectedFriends(selectedFriends.filter(id => id !== item._id));
        setSelect(selectedFriends.filter(id => id !== item._id));
      } else {
        setSelectedFriends([...selectedFriends, item._id]);
        setSelect([...selectedFriends, item._id]);
      }
      setType('non-group')
    }
  };


  const acceptedFriendsList = useCallback(async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:8000/chat/user/accepted-friends/${userId}`,
      );
      
      const data = await response.json();
     console.log(data,"++")

    

      if (response.ok) {
        setAcceptedfriends(data);
      }
    } catch (err) {
      console.log('Error in frontend', err);
    }
  },[userId])

  const fetchFriendsPaymentStatus =useCallback(async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8000/chat/user/friendsPaymentStatus/${userId}`);
      const friendsPaymentStatus = await response.json();
  
      if (response.ok) {
        console.log(friendsPaymentStatus, "--");
        // Assuming setFriendsPaymentStatus is a state setter function
        setPaymentStatus(friendsPaymentStatus); 
      } else {
        console.error('Failed to fetch friends payment status');
      }
    } catch (err) {
      console.error('Error in frontend', err);
    }
  },[userId]);

  useFocusEffect(
    useCallback(() => {
      const fetchAllData = async () => {
        await acceptedFriendsList();
        await fetchFriendsPaymentStatus();
      };
      fetchAllData();
      const unsubscribe = navigation.addListener('tabPress', e => {
        e.preventDefault();
        setRefresh(!refresh);
      });

      return () => {
        unsubscribe();
      };
    }, [refresh, acceptedFriendsList, fetchFriendsPaymentStatus])
  );

  useEffect(() => {

    const fetchAllData=async()=>{
      
    await fetchFriendsPaymentStatus();
    await acceptedFriendsList();

    };
    fetchAllData();
  
  }, [refresh,fetchFriendsPaymentStatus,acceptedFriendsList]);

  const combineData = () => {
    return acceptedFriends.map(friend => {
      const paymentStatusForFriend = paymentStatus.find(
        status => status.friendId === friend._id,
      );
      return {
        ...friend,
        friendOwesMe: paymentStatusForFriend
          ? paymentStatusForFriend.friendOwesMe
          : 0,
        iOweFriend: paymentStatusForFriend
          ? paymentStatusForFriend.iOweFriend
          : 0,
      };
    });
  }

  const combinedData=combineData();
  console.log(combinedData,"||||")


  // useFocusEffect(
  //   React.useCallback(() => {
  //     const unsubscribe = navigation.addListener('tabPress', e => {
  //       // Prevent default behavior
  //       e.preventDefault();
  //       // Perform any custom action
  //       setRefresh(!refresh);
  //     });

  //     return unsubscribe;
  //   }, [refresh])
  // );

 


  return (
    <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
      <HeaderBar title={'ChatHomeScreen'} />
      <ScrollView>
        <Pressable>
          {combinedData.map((item, index) => (
            <UserChat key={index} item={item} />
          ))}
        </Pressable>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('Home')}>
            <AntDesign name="addusergroup" size={22} color={'#D77702'} />
            <Text style={styles.buttonText}>Add Friends</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={{position: 'relative'}} onPress={handleModel}>
        <View style={styles.buttonContainer1}>
          <MaterialIcons name="notes" size={22} color={'white'} />
          <Text style={styles.buttonText1}>Add expense</Text>
        </View>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="edit-note"
                size={50}
                style={{
                  borderWidth: 0.5,
                  borderBottomWidth: 3,
                  borderRadius: 10,
                  borderColor: 'gray',
                }}
                color={'#D77702'}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter a Description"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDecription}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="cash"
                size={45}
                style={{
                  padding: 3,
                  borderWidth: 0.5,
                  borderBottomWidth: 3,
                  borderRadius: 10,
                  borderColor: 'gray',
                }}
                color={'#D77702'}
              />
              <TextInput
                style={styles.input}
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
            <Text style={styles.label}>Select Participants/Groups :</Text>
            <View style={styles.inputContainer1}>
              <TouchableOpacity
                style={styles.saveButton1}
                onPress={() => handleFriends()}>
                <Text style={styles.saveButtonText}>Friends</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton1}
                onPress={() => handleGroups()}>
                <Text style={styles.saveButtonText}>Groups</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={friendList}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.friendItem}
                  onPress={() => handleSelection(item)}>
                  <View style={styles.pressableContainer}>
                    <Image source={{uri: item.image}} style={styles.image} />
                    <View style={styles.textContainer}>
                      <Text style={styles.textName}>{item.name}</Text>
                      <Text style={styles.textLast}>{item.email}</Text>
                    </View>

                    {isGroup ? (
                      <View style={styles.checkbox}>
                        {selectGroup.includes(item._id) && (
                          <View style={styles.checkedCircle} />
                        )}
                      </View>
                    ) : (
                      <View style={styles.checkbox}>
                        {select.includes(item._id) && (
                          <View style={styles.checkedCircle} />
                        )}
                      </View>
                    )}
                    <View />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item._id}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleAddExpense()}>
              <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
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
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D77702',
    textAlign: 'center',
    marginLeft: 6,
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
    borderWidth: 2,
    borderColor: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  inputContainer1: {
    flexDirection: 'row',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 250,
    marginLeft: 2,
  },
  textArea: {
    height: 41,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
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
  saveButton1: {
    backgroundColor: 'darkorange',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 3,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 0.9,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: '#D0D0D0',
    padding: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  textName: {
    fontWeight: '500',
    fontSize: 15,
    color: 'black',
  },
  textLast: {
    color: 'gray',
    fontWeight: '500',
  },
  textTime: {
    fontSize: 13,
    fontWeight: '500',
    color: '#585858',
  },

  leftText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
