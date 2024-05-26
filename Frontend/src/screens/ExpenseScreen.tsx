// import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useRoute } from '@react-navigation/native';
// import HeaderBar from './HeaderBar';
// import axios from 'axios';

// const ExpenseScreen = ({navigation}:any) => {
// const route=useRoute();
//   const { expenseId }:any = route.params;
//   const [expense, setExpense] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchExpense = async () => {
//       try {
//         const response = await axios.get(`http://10.0.2.2:8000/chat/expense/expense/${expenseId}`);
//         console.log(response.data,"+==")
//         setExpense(response.data);
    
//       } catch (error) {
//         setError('Error fetching expense details');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExpense();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>{error}</Text>
//       </View>
//     );
//   }



//   return (
//     <View>
       
//        <HeaderBar title={'AddFriend'} />
//        <View style={styles.pressableContainer}>
//           <View style={styles.pressableContainer1}>
       
//           <Text  style={{color:'black'}}>{expense.description}</Text>
        
//         </View>
//         <View style={styles.pressableContainer2}>
         
//           <Text style={{color:'black'}}>Non-group Expenses:</Text>
    
//         </View>
//           </View>
//     </View>
//   )
// }

// export default ExpenseScreen

// const styles = StyleSheet.create({
//   pressableContainer:{

//     flexDirection:"row",
//     alignItems:"center",
//     gap:10,
//     borderWidth:0.9,
//     borderLeftWidth:0,
//     borderRightWidth:0,
//     borderBottomWidth:1,
//     borderColor:"#D0D0D0",
//     padding:10,
// justifyContent:'center'



// },
// pressableContainer1:{
// flex:1,
//   flexDirection:"row",
//   alignItems:"center",
//   gap:10,
//   borderWidth:0,
//   borderLeftWidth:1,
//   borderRightWidth:1,
//   borderBottomWidth:4,
//   borderColor:"#D77702",
//   padding:5,
//   textAlign:'center',
//   justifyContent:'center',
  
//   marginTop:-5,
//   height:40,

  




// },
// pressableContainer2:{

//   flex:1,
//   flexDirection:"row",
//   alignItems:"center",
//   gap:10,
//   borderWidth:0,
//   borderLeftWidth:1,
//   borderRightWidth:1,
//   borderBottomWidth:4,
//   borderColor:"#D77702",
//   padding:5,
//   textAlign:'center',
//   justifyContent:'center',
  
//   marginTop:-5,
//   height:40,

// },

// container: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: 16,
// },
// error: {
//   color: 'red',
//   fontSize: 18,
// },
// })





import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import HeaderBar from './HeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

const ExpenseScreen = ({ navigation }:any) => {
  const route=useRoute();
  const { expenseId } = route.params;
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/chat/expense/expense/${expenseId}`);
        setExpense(response.data);
      } catch (err) {
        setError('Error fetching expense details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [expenseId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (

    <>
    <HeaderBar title={'AddFriend'} />
    <View style={styles.mainContainer}>
    <Text style={styles.title}>Expense Details</Text>

      <ScrollView contentContainerStyle={styles.container}>

        <View style={{flex:1,flexDirection:'row', gap:15}}>

      {      
            expense.type=='group'?
            <MaterialIcons name='groups' size={40} color={'#D77702'} />
            :
            <FontAwesome6Icon name='money-bills' size={40} color={'#D77702'} />
        }
        <Text style={styles.value1}>{expense.description}</Text>
        </View>
        <Text style={styles.value2}>₹{expense.amount}</Text>

        <Text style={styles.label}>Added by {expense.type}</Text>
        <Text style={styles.value}>{new Date(expense.date).toLocaleDateString()}</Text>


        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{expense.type}</Text>

        <Text style={styles.label}>Payer:</Text>
        <Text style={styles.value}>{expense.payerId.name}</Text>

        <Text style={styles.label}>Participants:</Text>
        {expense.participants.map(participant => (
          <Text key={participant._id} style={styles.value}>{participant.name}</Text>
        ))}

        <Text style={styles.label}>Settled:</Text>
        <Text style={styles.value}>{expense.settled ? 'Yes' : 'No'}</Text>
      </ScrollView>
    </View>
    </>
  );
};

export default ExpenseScreen;

const styles = StyleSheet.create({
  mainContainer:{
    marginBottom:220



  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:9,
    textAlign: 'center',
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  value1: {
    fontSize: 40,
    marginBottom: 10,
    marginTop:-6.5,
    fontWeight: '500',
    color:'gray',
    fontFamily:'sans-serif'
  },
  value2: {
    fontSize: 40,
    marginBottom: 10,
    marginTop:-6.5,
    marginLeft:0,
    fontWeight: 'bold',
    color:'black',
    fontFamily:'sans-serif'
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});


