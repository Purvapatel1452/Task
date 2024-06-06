import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
interface UserChatprops {
  item: any;
}

const UserChat: React.FC<UserChatprops> = ({item, navigateMessages}) => {
  const navigation = useNavigation();

  const netBalance = item.friendOwesMe - item.iOweFriend;
  let paymentStatusMessage = '';
  let amount = '';
  if (netBalance > 0) {
    paymentStatusMessage = `owes you `;
    amount = `₹${netBalance.toFixed(2)}`;
  } else if (netBalance < 0) {
    paymentStatusMessage = `you owe `;
    amount = `₹${Math.abs(netBalance).toFixed(2)}`;
  } else if (netBalance == 0) {
    paymentStatusMessage = `settled up`;
  }

  return (
    <Pressable
      onPress={navigateMessages}
      style={styles.pressableContainer}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.textName}>{item.name}</Text>
        <Text style={styles.textLast}>Last chat comes here . . . </Text>
      </View>
      <View style={styles.paymentStatusContainer}>
        
        <Text
          style={[
            styles.paymentStatus,
            {color: netBalance >= 0 ? 'green' : 'red'},
          ]}>
          {'    '}
          {paymentStatusMessage}
        </Text>
        <Text
          style={[
            styles.paymentStatus,
            {
              color: netBalance >= 0 ? 'green' : 'red',
              fontWeight: '500',
              fontSize: 14.5,
            },
          ]}>
          {amount}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({
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
  paymentStatusContainer: {
    marginTop: 2,
    alignItems:'center'
  },
  paymentStatus: {
    fontSize: 12,
    justifyContent:'center',
    alignSelf:'center',
  },
});
