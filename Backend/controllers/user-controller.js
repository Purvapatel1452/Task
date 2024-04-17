const User = require("../models/user");
const jwt = require("jsonwebtoken");

//creating a Token
const createToken=(userId)=>{

    const payload={
        userId:userId
    }

    const token=jwt.sign(payload,"Purv@ p@tel",{expiresIn:'1h'})
    console.log("TOKEN",token)

    return token;
}

//registering user
const registerUser=async(req,res)=>{
    const {name,email,password,image}=req.body;

    //create new user 

    const newUser= await User({name,email,password,image})

    //save the user to the db

    newUser
    .save()
    .then(()=>{
        res.status(200).json({message:"User registered Successfully "})
    })
    .catch((err)=>{

        console.log("error in registering",err)
        res.status(500).json({message:"Error in registering"})

    })
}



//login user
const loginUser=async(req,res)=>{

    const {email,password}=req.body
    console.log(email,password)

    if(!email||!password){
        return res.status(404).json({message:"email and password both are required"})
    }

    await User.findOne({email})
    .then((user)=>{
        if(!user){
            return res.status(404).json({message:"User not Found !!!"})
        }

        if(user.password !== password){

            return res.status(404).json({message:"Invalid Password !!!"})
            
        }

        const token =createToken(user._id);
        res.status(200).json({token})
    })
    .catch((err)=>{
        console.log("error in findng the User:",err)

        res.status(500).json({message:"Internal Server Error"})

    })

}


//get all users except the user id that is currently logged in

const  getUsers=async(req, res) => {
    const loggedUserId = req.params.userId;

    console.log(loggedUserId)


    User.find({ _id: { $ne: loggedUserId } })
        .then((users) => {
            // if (!users || users.length === 0) {
            //     return res.status(404).json({ message: 'Users not found' });
            // }
            
            res.status(200).json(users);
        })
        .catch((err) => {
            console.log("error::", err);
            res.status(500).json({ message: 'Error retrieving users' });
        });
}




//posting friend request and updating it in the both the users arrays

 const friendRequest=async(req,res)=>{
    
    const {currentUserId,selectedUserId}=req.body

    console.log("curr",currentUserId)
    console.log("select",selectedUserId)

    try{

        //updating recepient's friendRequestArray
        await User.findByIdAndUpdate(selectedUserId,{
            $push:{friendRequests:currentUserId}
        })
        


        //updating sender's sentRequest Array
        await User.findByIdAndUpdate(currentUserId,{

            $push:{sentFriendRequests:selectedUserId}
        })


res.sendStatus(200)
    }
    catch(err){
        console.log("error in sending Request",err)
        res.sendStatus(500)
    }

    
}




//endpoint to show all friend requests of the particular user

const friendRequestList=async(req,res)=>{
    const userId=req.params.userId
        console.log(userId)

    try{

        

        const user=await User.findById(userId).populate("friendRequests","name email image").lean()

        console.log("USERRR:",user)

        const friendRequests=user.friendRequests

       console.log(friendRequests)
        res.status(200).json(friendRequests)
        
    }
    catch(err){

        console.log("ERROR HANDLING",err)

        res.status(500).json({message:"errror in retrieving"})

    }
}


//endpoints to accept the friend requests and to navigate to the chat directly


const acceptFriendRequest=async(req,res)=>{

    try {  
      const {senderId,recepientId}=req.body
  
      const sender=await User.findById(senderId);
      const recepient=await User.findById(recepientId)
  
      sender.friends.push(recepientId);
      recepient.friends.push(senderId)
  
      recepient.friendRequests=recepient.friendRequests.filter(
          (request)=>{
              request.toString()!=senderId.toString()
          })
      
      sender.sentFriendRequests=sender.sentFriendRequests.filter(
          (request)=>{
              request.toString()!=recepientId.toString()
          }
      )    
  
      await sender.save();
      await recepient.save();
  
      res.status(200).json({message:"friend request accepted successfully"})
  }
  catch(err){
      console.log("Errror in retrievinfg request",err)
      res.status(500).json({message:"Error not fount any request"})
  }
  
      
}



//endpoint to get all friends of the logged in user

const friends=async(req,res)=>{

    try{

        const {userId}=req.params
        const user=await User.findById(userId).populate(
            "friends",
            "name email image"
        )

        const acceptedFriends=user.friends;
        res.json(acceptedFriends)

    }
    catch(err){
        console.log("Error in retrieving friends",err)

        res.status(500).json({message:"Internal Server Error"})
    }
}






module.exports={
    registerUser,
    loginUser,
    getUsers,
    friendRequest,
    friendRequestList,
    acceptFriendRequest,
    friends
}