import { Pressable, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderBar from './HeaderBar'
import ExpenseBox from '../components/ExpenseBox'
import { useDispatch, useSelector } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native'
import { fetchExpenses } from '../redux/slices/expensesSlice'

const ExpensesScreen = () => {

  const {userId}=useSelector(state=>state.auth)
  const {expenses,loading,error}=useSelector(state=>state.expenses)


  const dispatch=useDispatch();

  // const [expenseList,setExpenseList]=useState([])
  const [isType,setIsType]=useState(false)
  const [expenseType,setExpenseType]=useState('')

  const navigation=useNavigation();





  // const handleExpenses=async(types)=>{
  //   try{
  //     console.log("ECXOPES")
  //     console.log("type",types)

  //     const response=await fetch(`http://10.0.2.2:8000/chat/expense/expenses/${userId}?expenseType=${expenseType}`)

  //     const data=await response.json();
    
  //     const list=[];
  //     if(types=='settled'){
  //       console.log(data,"**")

  //       data.expenses.map(expense=>{
  //         if(expense.settled){
  //           list.push(expense)
  //         }
  //       })

  //     }else{
  //       data.expenses.map(expense=>{
         
  //           list.push(expense)
          
  //       })
        
  //     }
     
   
     
  //     setExpenseList(list)


  //   }
  //   catch(error){
  //     console.log("Error in internal server:",error)
  //   }
  // }

  
  const handleExpenses=async(expenseType)=>{
    try{
      console.log("ECXOPES")
      console.log("type",expenseType)
      let type=''

     dispatch(fetchExpenses({userId,type:expenseType}))
     
  
    }
    catch(error){
      console.log("Error in internal server:",error)
    }
  }
  
//   const groupExpenses=async(type)=>{
//     try{
//       console.log("ECXOPES")
//       console.log("type",expenseType)

//       const response=await fetch(`http://10.0.2.2:8000/chat/expense/expenses/${userId}?expenseType=${type}`)

//       const data=await response.json();
//       console.log('Expe',data)
//       setExpenseList(data.expenses)
// console.log('Expe',expenseList)
//       console.log(data)

//     }
//     catch(error){
//       console.log("Error in internal server:",error)
//     }
//   }


const groupExpenses=async(expenseType)=>{
  try{
    console.log("ECXOPES")
    console.log("type",expenseType)

  dispatch(fetchExpenses({userId,expenseType}))

 
console.log('Expe',expenseList)
 

  }
  catch(error){
    console.log("Error in internal server:",error)
  }
}




//   const nonGroupExpenses=async()=>{
//     try{
//       console.log("ECXOPES")
//       console.log("type",expenseType)

//       const response=await fetch(`http://10.0.2.2:8000/chat/expense/expenses/${userId}?expenseType=non-group`)

//       const data=await response.json();
//       console.log('Expe',data)
//       setExpenseList(data.expenses)
// console.log('Expe',expenseList)
//       console.log(data)

//     }
//     catch(error){
//       console.log("Error in internal server:",error)
//     }
//   }


  useEffect(()=>{
 
    handleExpenses('non-settled');
  },[])

  return (
    <View>

          <StatusBar backgroundColor={'#D77702'} />

          <HeaderBar title={"TabScreen"} />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  >
          <View style={styles.pressableContainer}>

          <TouchableOpacity onPress={()=>handleExpenses('non-settled')}>
        <View style={styles.pressableContainer2}>
         
          <Text style={{color:'black',fontSize:15,fontWeight:'bold'}}>All Expenses</Text>
     
        </View>
        </TouchableOpacity>
      
        
          <TouchableOpacity onPress={()=>groupExpenses('group')}>
          <View style={styles.pressableContainer1}>
          
          <Text  style={{color:'black',fontSize:15,fontWeight:'bold'}}>Group Expenses</Text>
      
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>groupExpenses('non-group')}>
        <View style={styles.pressableContainer2}>
         
          <Text style={{color:'black',fontSize:15,fontWeight:'bold'}}>Non-group Expenses</Text>
     
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleExpenses('settled')}>
        <View style={styles.pressableContainer2}>
         
          <Text style={{color:'black',fontSize:15,fontWeight:'bold'}}>Settled Expenses</Text>
     
        </View>
        </TouchableOpacity>
      
       
      
          </View>
          </ScrollView>
       



          <ScrollView>
            <View style={{marginBottom:300}}>
          {expenses.map((item, index) => (
            <ExpenseBox key={index} item={item} navigation={navigation} />
           
          ))}
          </View>
        </ScrollView>



    </View>
  )
}

export default ExpensesScreen

const styles = StyleSheet.create({
  pressableContainer:{

    flexDirection:"row",
    alignItems:"center",
    gap:10,
    borderWidth:0.9,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomWidth:1,
    borderColor:"#D0D0D0",
    padding:6,
    justifyContent:'center',
    height:60,
    

},
pressableContainer1:{


  alignItems:"center",
  borderWidth:0,
  borderLeftWidth:1,
  borderRightWidth:1,
  borderBottomWidth:4,
  borderColor:"#D77702",
  padding:3,
  textAlign:'center',
  justifyContent:'center',
  
  marginTop:-19,
  marginBottom:-10,
  width:160,
  height:40



},
pressableContainer2:{


 
  alignItems:"center",
  borderWidth:0,
  borderLeftWidth:1,
  borderRightWidth:1,
  borderBottomWidth:4,
  borderColor:"#D77702",
  padding:3,
  textAlign:'center',
  justifyContent:'center',
  marginTop:-19,
  marginBottom:-10,
  width:160,
  height:40

},
})