import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import ProfilePic from './ProfilePic';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGroupData} from '../redux/slices/groupSlice';
import FastImage from 'react-native-fast-image';

const HeaderBar = ({title}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.auth);
  const {groupData, loading, error} = useSelector(state => state.group);

  useEffect(() => {
    dispatch(fetchGroupData(userId));
  }, [dispatch]);

  const renderIcon = () => {
    switch (title) {
      case 'TabScreen':
        return (
          <View style={styles.headerContainer}>
            <Text></Text>
          </View>
        );
      case 'ChatScreen':
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Friends</Text>

            <ProfilePic />
          </View>
        );
      case 'GroupChatScreen':
        return (
          <View style={styles.headerContainerGroup}>
            <IonIcons
              name="arrow-back-sharp"
              size={28}
              color={'white'}
              onPress={() => navigation.goBack()}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChatProfile', {data: groupData})
              }>
              <View style={styles.imageContainer}>
                {groupData.image ? (
                  <FastImage
                    source={{uri: groupData.image}}
                    style={styles.image}
                  />
                ) : (
                  <FastImage
                    source={{
                      uri: 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg',
                    }}
                    style={styles.image}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.headerText}>Expense</Text>
          </View>
        );
      case 'Expense':
        return (
          <View style={styles.headerContainer}>
            <IonIcons
              name="arrow-back-sharp"
              size={28}
              color={'white'}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerText}>Expense</Text>
            <Text> </Text>
          </View>
        );
      case 'Friends':
        return (
          <View style={styles.headerContainer}>
            <IonIcons
              name="arrow-back-sharp"
              size={28}
              color={'white'}
              onPress={() => navigation.goBack()}
            />

            <Text> </Text>
          </View>
        );

      case 'GroupScreen':
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Groups</Text>

            <ProfilePic />
          </View>
        );
      case 'ExpensesScreen':
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Expenses</Text>

            <ProfilePic />
          </View>
        );
      case 'FriendRequest':
        return (
          <View style={styles.headerContainer1}>
            <IonIcons
              name="arrow-back-sharp"
              size={28}
              color={'white'}
              onPress={() => navigation.goBack()}
            />

            <Text style={[styles.headerText, {flex: 1, marginLeft: 5}]}>
              Friend Requests
            </Text>
          </View>
        );
      case 'AddFriends':
        return (
          <View style={styles.headerContainer1}>
            <IonIcons
              name="arrow-back-sharp"
              size={28}
              color={'white'}
              onPress={() => navigation.goBack()}
            />

            <Text style={[styles.headerText, {flex: 1, marginLeft: 5}]}>
              Add Friends
            </Text>
          </View>
        );
      case 'Subscription':
        return (
          <View style={styles.headerContainerSub}>
            <Text style={styles.headerText}>Subscription</Text>
          </View>
        );
    }
  };
  return renderIcon();
};

export default HeaderBar;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#D77702',
    position: 'relative',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomStartRadius: 1,
    borderBottomEndRadius: 1,
    borderColor: 'silver',
    shadowColor: 'black',
    shadowOpacity: 2,
    elevation: 10,
  },
  headerContainerSub: {
    backgroundColor: '#D77702',
    position: 'relative',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomStartRadius: 1,
    borderBottomEndRadius: 1,
    borderColor: 'silver',
    shadowColor: 'black',
    shadowOpacity: 2,
    elevation: 10,
  },
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

  headerContainer1: {
    backgroundColor: '#D77702',

    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomStartRadius: 1,
    borderBottomEndRadius: 1,
    borderColor: 'silver',
    shadowColor: 'black',
    shadowOpacity: 2,
    elevation: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
  },
  imageContainer: {
    height: 30,
    width: 30,
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 10,
    elevation: 5,
  },
  image: {
    height: 36,
    width: 36,
  },
});
