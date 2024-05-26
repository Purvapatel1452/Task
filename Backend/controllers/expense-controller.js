const Expense = require("../models/expense");
const Group = require("../models/group");
const User = require("../models/user");

const addExpense = async (req, res) => {
  try {
    console.log("expense Initiated");
    const { description, amount, payerId, payeeId,groupId,type } = req.body;
const part=[...payeeId,payerId]
    const uniqueParticipants=[...new Set(part)]
    const newExpense = new Expense({
      description,
      amount,
      payerId,
      participants:uniqueParticipants,
      groupId,
      type,
    });
    console.log("NEW EXPP", newExpense);
    await newExpense.save();

    const splitAmount=amount/uniqueParticipants.length;
    console.log(splitAmount)

    for(participantId of uniqueParticipants){
      await User.findByIdAndUpdate(participantId,{
        $inc:{balance:-splitAmount}
      });
    }
    for(participantId of uniqueParticipants){
      await User.findByIdAndUpdate(participantId,{
        $push:{expenses:newExpense._id}
      });
    }


    if(groupId){
      await Group.findByIdAndUpdate(groupId,{
        $push:{expenses:newExpense._id}
      })
    }

    console.log("ONE_TO_ONE expens cerated successfully");
    res
      .status(200)
      .json({ message: "One-to-one expense created successfully !!!" });
  } catch (error) {

    console.log("Error in internal server", error);

  }
};

// const expenses = async (req, res) => {
//   try {
//     console.log("getting expenses");

//     const { userId1, userId2 } = req.params;
//     console.log("ids", userId1, userId2);

//     const expenses = await Expense.find({
//       type: "one-to-one",
//       participants: { $all: [userId1, userId2] },
//     });
//     console.log("EXP", expenses);
//     res.status(200).json(expenses);
//   } catch(error){

//     console.log("Error in internal server:", error);
//     res.status(404).json({ message: "Internal server error" });

//   }

// };


// const expenses=async(req,res)=>{
//   try{

//     console.log("expense showed");

//     const {userId}=req.params;

//     if(!userId){
//       return res.status(404).json({message:'User Id is required'})
//     }

//     const expense=await Expense.find({
//       $or:[
//         {payerId:userId},
//         {participants:userId}
//       ]
//     }).populate('payerId','_id name')
//       .populate('participants','_id name')
//       .populate('groupId','_id name')

//       res.status(200).json(expense)

//   }
//   catch(error){

//     console.log("Error in internal server:", error)
//     res.status(404).json({message:"internal server error"})

//   }
// }

const expenses=async(req,res)=>{

  try{

    console.log("Expesnees")

    const {userId}=req.params;
    const {expenseType}=req.query

    const query=expenseType?{type:expenseType}:{}

    const user=await User.findById(userId).populate({
      path:'expenses',
      match:query
    })
    
    console.log("Expesnees",user)

    if(!user){
      return res.status(404).json({message:'User Not Found !!!'})
    }

    console.log(user,"++")

    res.status(200).json({expenses:user.expenses})

  }catch(error){
    console.log("internal server Error:",error)
    res.status(404)
  }

}


const expense=async(req,res)=>{

  try{const {expenseId}=req.params;

  console.log("ID",expenseId)

  const expense=await Expense.findById(expenseId);

  res.status(200).json(expense)
}
catch(error){
  console.log("error in internal server",error);
  res.status(404).json({message:'internal server error'})
}


}

module.exports = {
  addExpense,
  expenses,
  expense
};
