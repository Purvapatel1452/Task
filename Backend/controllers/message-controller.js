const Message=require('../models/message');
const User = require('../models/user');




//endpoints to POST messages and to store it in the backend

const messages=async(req,res)=>{

    try{

        const {senderId,recepientId,messageType,messageText}=req.body

        const newMessage= new Message({
            senderId,
            recepientId,
            messageType,
            message:messageText,
            timestamp:new Date(),
            imageUrl:messageType=='image'?req.file.path:null
        })

    
console.log(newMessage)
        await newMessage.save();
      

        res.status(200).json({message:"message sent successfully"})

    }catch(err){

        console.log("error in posting msg",err)

        res.status(500).json({message:"internal server error"})

    }

}



//endpoints to get user details in chat header bar

const userDetails=async(req,res)=>{
    try{

        const {userId}=req.params

        const recepientId=await User.findById(userId);

        res.json(recepientId);


    }catch(err){

        console.log("error in retrieving user details",err)

        res.status(500).json({message:"internal server error"})

    }
}


//endpoints to fetch messages between the users in chatroom


const chatMessages=async(req,res)=>{
    try{

        const {senderId,recepientId}=req.params
console.log(senderId, recepientId)
        const messages=await Message.find({
            $or:[
                {senderId:senderId,recepientId:recepientId},
                {senderId:recepientId,recepientId:senderId},
            ],
        }).populate("senderId","_id name")

        console.log("ff",messages)
        res.json(messages)

    }catch(err){
        console.log("error in retrieving messages",err)

        res.status(500).json({message:"internal server error"})

    }
}




module.exports={
    messages,
    userDetails,
    chatMessages
}