const Expense = require("../models/expense");
const Group = require("../models/group");
const User = require("../models/user");



const addExpense=async(req,res)=>{

   try{ 
console.log('expense Initiated')
        const {description,amount,payerId,payeeId}=req.body;

        const newExpense=new Expense({

            description,
            amount,
            payerId,
            participants:[payerId,payeeId],
            type:'one-to-one',

        });
console.log("NEW EXPP",newExpense)
        await newExpense.save();

        console.log("ONE_TO_ONE expens cerated successfully")
        res.status(200).json({message:'One-to-one expense created successfully !!!'})



      }
      catch(error){
        console.log("Error in internal server",error)
      }

}


module.exports={
    addExpense
}