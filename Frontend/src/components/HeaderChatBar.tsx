import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupData } from '../redux/slices/groupSlice';
import { fetchRecepientData } from '../redux/slices/recepientSlice';
import FastImage from 'react-native-fast-image';

const HeaderChatBar = ({ title, id }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { groupData, groupLoading, groupError } = useSelector(state => state.group);
  const { recepientDatas, recepientLoading, recepientError } = useSelector(state => state.recepient);

  useEffect(() => {
    setIsLoading(true);
    if (title === 'GroupChatScreen') {
      dispatch(fetchGroupData(id));
    } else if (title === 'ChatMessageScreen') {
      dispatch(fetchRecepientData(id));
    }
    setTimeout(() => setIsLoading(false), 800);
  }, [dispatch, id, title]);

  const truncateText = (text, limit) => text.length <= limit ? text : `${text.substring(0, limit)}...`;
  
  const concatenateMemberNames = (members, limit) => {
    let concatenated = '';
    let totalLength = 0;

    for (let member of members) {
      const nameLength = member.name.length;

      if (totalLength + nameLength + 2 > limit) { // +2 accounts for ', ' between names
        concatenated += '...';
        break;
      }
      
      concatenated += (totalLength === 0 ? '' : ', ') + member.name;
      totalLength += nameLength + 2; // +2 for ', '
    }

    return concatenated;
  };
  

  const renderIcon = () => {
    if (title === 'GroupChatScreen' && groupData) {
      return (
       <>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('GroupChatProfile', { groupId: id })
              }>
              <View style={styles.imageContainer}>
                <FastImage
                  source={{ uri: groupData.image }}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          )}
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View>
              <Text style={styles.headerText}>
                {truncateText(groupData.name, 16)}
              </Text>
              <View style={styles.listContainer}>
                <View style={styles.container}>

                <Text style={styles.desc}>
                    {concatenateMemberNames(groupData.members, 45)}
                  </Text>

                  
                  {/* {groupData.members.map(member => (
                    <Text key={member._id} style={styles.desc}>
                      {member.name},{' '}
                    </Text>
                  ))} */}
                </View>
              </View>
            </View>
          )}
          </>
      
      );
    } else if (title === 'ChatMessageScreen' && id) {
      return (
       <>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserProfile', { recepientId: id })
              }>
              <View style={styles.imageContainer}>
                {
                  recepientDatas.image ?
                  <FastImage
                  source={{ uri: recepientDatas.image }}
                  style={styles.image}
                />
                  :
                  <FastImage
                  source={{
                    uri: 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg',
                  }}
                  style={styles.image}
                />
                }
               
              </View>
            </TouchableOpacity>
          )}
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View>
              <Text style={styles.headerText}>
                {truncateText(recepientDatas.name, 16)}
              </Text>
              <Text style={styles.desc}>
                {truncateText(recepientDatas.email, 32)}
              </Text>
            </View>
          )}
       </>
      );
    }
    return null;
  };

  return (
    <View style={styles.headerContainerGroup}>
    <IonIcons
      name="arrow-back-sharp"
      size={28}
      color={'white'}
      onPress={() => navigation.goBack()}
    />
    {
        renderIcon()

    }
  
    </View>

  )
};

const { width, height } = Dimensions.get('window');

export default HeaderChatBar;

const styles = StyleSheet.create({
  headerContainerGroup: {
    backgroundColor: '#D77702',
    position: 'relative',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomStartRadius: 1,
    borderBottomEndRadius: 1,
    borderColor: 'silver',
    shadowColor: 'black',
    shadowOpacity: 2,
    elevation: 10,
    gap: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    top: -height * 0.01,
  },
  desc: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    left: width * 0.00233,
    top: -height * 0.008,
  },
  imageContainer: {
    height: 45,
    width: 45,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 10,
    elevation: 5,
  },
  image: {
    height: 45,
    width: 45,
  },
  listContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -height * 0.008,
  },
  memberName: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});

























// import {
//   ActivityIndicator,
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import ProfilePic from './ProfilePic';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchGroupData} from '../redux/slices/groupSlice';
// import {fetchRecepientData} from '../redux/slices/recepientSlice';

// const HeaderChatBar = ({title, id}) => {
//   console.group(id);
//   const navigation = useNavigation();
//   const [isLoad, setIsLoad] = useState(true);

//   const dispatch = useDispatch();
//   const {userId} = useSelector(state => state.auth);
//   const {groupData, loading, error} = useSelector(state => state.group);
//   const {recepientDatas} = useSelector(state => state.recepient);

//   setTimeout(() => {
//     setIsLoad(false);
//   }, 1000);
//   console.log(recepientDatas, ')))))))');
//   useEffect(() => {
//     dispatch(fetchGroupData(id));
//     dispatch(fetchRecepientData(id));
//   }, [dispatch]);

//   const truncateText = (text, limit) => {
//     if (text.length <= limit) {
//       return text;
//     }
//     return text.substring(0, limit) + '...';
//   };

//   const renderIcon = () => {
//     switch (title) {
//       case 'GroupChatScreen':
//         return (
//           <>
//             <View style={styles.headerContainerGroup}>
//               <IonIcons
//                 name="arrow-back-sharp"
//                 size={28}
//                 color={'white'}
//                 onPress={() => navigation.goBack()}
//               />
//               {isLoad ? (
//                 <ActivityIndicator />
//               ) : (
//                 <TouchableOpacity
//                   onPress={() =>
//                     navigation.navigate('GroupChatProfile', {groupId: id})
//                   }>
//                   <View style={styles.imageContainer}>
//                     <Image
//                       source={{uri: groupData.image}}
//                       style={styles.image}
//                     />
//                   </View>
//                 </TouchableOpacity>
//               )}
//               {isLoad ? (
//                 <ActivityIndicator />
//               ) : (
//                 <View>
//                   <Text style={styles.headerText}>
//                     {truncateText(groupData.name, 16)}
//                   </Text>
//                   {/* <View style={styles.listContainer}>
//                     <View style={styles.container}>
//                       {groupData.members.map(member => {
//                         <Text key={member._id} style={styles.memberName}>
//                           {member.name}
//                         </Text>;
//                       })}
//                     </View>
//                   </View> */}
//                   <View style={styles.listContainer}>
//                     <View style={styles.container}>
//                       {groupData.members.map(member => (
//                         <Text key={member._id} style={styles.desc}>
//                           {member.name},{' '}
//                         </Text>
//                       ))}
//                     </View>
//                   </View>
//                   {/* <Text style={styles.desc}>
//                     {truncateText(groupData.description, 32)}
//                   </Text> */}
//                 </View>
//               )}
//             </View>
//           </>
//         );
//         break;
//       case 'ChatMessageScreen':
//         return (
//           <>
//             <View style={styles.headerContainerGroup}>
//               <IonIcons
//                 name="arrow-back-sharp"
//                 size={28}
//                 color={'white'}
//                 onPress={() => navigation.goBack()}
//               />
//               {isLoad ? (
//                 <ActivityIndicator />
//               ) : (
//                 <TouchableOpacity
//                   onPress={() =>
//                     navigation.navigate('UserProfile', {recepientId : id})
//                   }>
//                   <View style={styles.imageContainer}>
//                     <Image
//                       source={{uri: recepientDatas.image}}
//                       style={styles.image}
//                     />
//                   </View>
//                 </TouchableOpacity>
//               )}
//               {isLoad ? (
//                 <ActivityIndicator />
//               ) : (
//                 <View>
//                   <Text style={styles.headerText}>
//                     {truncateText(recepientDatas.name, 16)}
//                   </Text>
//                   <Text style={styles.desc}>
//                     {truncateText(recepientDatas.email, 32)}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           </>
//         );
//         break;
//     }
//   };
//   return renderIcon();
// };

// const {width, height} = Dimensions.get('window');

// export default HeaderChatBar;

// const styles = StyleSheet.create({
//   headerContainer: {
//     backgroundColor: '#D77702',
//     position: 'relative',
//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderBottomStartRadius: 1,
//     borderBottomEndRadius: 1,
//     borderColor: 'silver',
//     shadowColor: 'black',
//     shadowOpacity: 2,
//     elevation: 10,
//   },
//   headerContainerGroup: {
//     backgroundColor: '#D77702',
//     position: 'relative',
//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     borderBottomWidth: 1,
//     borderBottomStartRadius: 1,
//     borderBottomEndRadius: 1,
//     borderColor: 'silver',
//     shadowColor: 'black',
//     shadowOpacity: 2,
//     elevation: 10,
//     gap: 10,
//   },

//   headerContainer1: {
//     backgroundColor: '#D77702',

//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderBottomStartRadius: 1,
//     borderBottomEndRadius: 1,
//     borderColor: 'silver',
//     shadowColor: 'black',
//     shadowOpacity: 2,
//     elevation: 10,
//   },
//   headerText: {
//     color: 'white',
//     fontSize: 30,
//     fontWeight: '500',
//     top: -height * 0.01,
//   },
//   desc: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '300',
//     left: width * 0.00233,
//     top: -height * 0.008,
//   },

//   imageContainer: {
//     height: 45,
//     width: 45,
//     borderRadius: 30,
//     borderColor: 'black',
//     borderWidth: 0.5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//     shadowColor: 'black',
//     shadowOpacity: 10,
//     elevation: 5,
//   },
//   image: {
//     height: 45,
//     width: 45,
//   },
//   listContainer: {
//     flex: 1,
//   },
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: -height * 0.008,
//   },

//   memberName: {
//     fontSize: 18,
//     marginBottom: 10,
//     color: 'white',
//   },
// });
