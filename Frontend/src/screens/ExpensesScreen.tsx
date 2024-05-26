import { Pressable, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderBar from './HeaderBar'
import { UserType } from '../../UserContext'
import ExpenseBox from '../components/ExpenseBox'

const ExpensesScreen = () => {

  const {userId,setUserId}=useContext(UserType)
  const [expenseList,setExpenseList]=useState([])
  const [isType,setIsType]=useState(false)
  const [expenseType,setExpenseType]=useState('')


  const handleGroupExpense=()=>{
    setExpenseType('group')
    expenses()
  }

  const handleNonGroupExpense=()=>{
    setExpenseType('non-group')
    expenses()
  }



  const expenses=async()=>{
    try{
      console.log("ECXOPES")
      console.log("type",expenseType)

      const response=await fetch(`http://10.0.2.2:8000/chat/expense/expenses/${userId}?expenseType=${expenseType}`)

      const data=await response.json();
      console.log('Expe',data)
      setExpenseList(data.expenses)
console.log('Expe',expenseList)
      console.log(data)

    }
    catch(error){
      console.log("Error in internal server:",error)
    }
  }
  
  const groupExpenses=async()=>{
    try{
      console.log("ECXOPES")
      console.log("type",expenseType)

      const response=await fetch(`http://10.0.2.2:8000/chat/expense/expenses/${userId}?expenseType=group`)

      const data=await response.json();
      console.log('Expe',data)
      setExpenseList(data.expenses)
console.log('Expe',expenseList)
      console.log(data)

    }
    catch(error){
      console.log("Error in internal server:",error)
    }
  }

  const nonGroupExpenses=async()=>{
    try{
      console.log("ECXOPES")
      console.log("type",expenseType)

      const response=await fetch(`http://10.0.2.2:8000/chat/expense/expenses/${userId}?expenseType=non-group`)

      const data=await response.json();
      console.log('Expe',data)
      setExpenseList(data.expenses)
console.log('Expe',expenseList)
      console.log(data)

    }
    catch(error){
      console.log("Error in internal server:",error)
    }
  }


  useEffect(()=>{
 
    expenses();
  },[])

  return (
    <View>

          <StatusBar backgroundColor={'#D77702'} />

          <HeaderBar title={"HomeScreen"} />
          <View style={styles.pressableContainer}>
          <View style={styles.pressableContainer1}>
          <TouchableOpacity onPress={()=>groupExpenses()}>
          <Text  style={{color:'black'}}>Group Expenses:</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.pressableContainer2}>
          <TouchableOpacity onPress={()=>nonGroupExpenses()}>
          <Text style={{color:'black'}}>Non-group Expenses:</Text>
        </TouchableOpacity>
        </View>
          </View>



          <ScrollView>
          <Pressable>
          {expenseList.map((item, index) => (
            <ExpenseBox key={index} item={item} />
          ))}
        </Pressable>
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
    padding:10,
justifyContent:'center'



},
pressableContainer1:{
flex:1,
  flexDirection:"row",
  alignItems:"center",
  gap:10,
  borderWidth:0,
  borderLeftWidth:1,
  borderRightWidth:1,
  borderBottomWidth:4,
  borderColor:"#D77702",
  padding:5,
  textAlign:'center',
  justifyContent:'center',
  
  marginTop:-5,
  height:40,

  




},
pressableContainer2:{

  flex:1,
  flexDirection:"row",
  alignItems:"center",
  gap:10,
  borderWidth:0,
  borderLeftWidth:1,
  borderRightWidth:1,
  borderBottomWidth:4,
  borderColor:"#D77702",
  padding:5,
  textAlign:'center',
  justifyContent:'center',
  
  marginTop:-5,
  height:40,
  





},
})