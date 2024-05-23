const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt')

const router=require('./routes/user-routes')
const msgRouter=require('./routes/message-routes')
const paymentRouter=require('./routes/payment-routes')
const groupRouter=require('./routes/group-routes')
const expenseRouter = require("./routes/expense-routes");


const  Stripe  = require("stripe");




const PORT = 8000;



const app = express();


app.use(cors());
 const stripe=new Stripe('sk_test_51P6pcYSCdNlkqtTKEbkko3R7u9AU05pNEw9TKpeAtiEze3NmZlsWaun94sEQehiPPdlUouvIJ5d2thhp2527uaaJ00WSnKy45N')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());


app.use('/chat/user',cors(),router)

app.use('/chat/message',cors(),msgRouter)

app.use('/chat/payments',paymentRouter)

app.use('/chat/group',groupRouter)

app.use('/chat/expense',expenseRouter)



app.listen(PORT,()=>{
    console.log(`Listening on the PORT ${PORT} . . . `)
})

mongoose
.connect("mongodb+srv://purvaptl1452:Purva%401452@try1.akekdhm.mongodb.net/")
.then(()=>{
    console.log("Connected to MongoDB . . . ")
})
.catch((err)=>{
    console.log("Error In connecting to MongoDb : ",err)
})





// app.post('/register',cors(),(req,res)=>{
//     const {name,email,password,image}=req.body;

//     //create new user 

//     const newUser=User({name,email,password,image})

//     //save the user to the db

//     newUser
//     .save()
//     .then(()=>{
//         res.status(200).json({message:"User registered Successfully "})
//     })
//     .catch((err)=>{

//         console.log("error in registering",err)
//         res.status(500).json({message:"Error in registering"})

//     })
// })

//creating a Token






//get all users except the user id that is currently logged in



// app.get('/users/:userId', cors(), (req, res) => {
//     const loggedUserId = req.params.userId;

//     console.log(loggedUserId)


//     User.find({ _id: { $ne: loggedUserId } })
//         .then((users) => {
//             // if (!users || users.length === 0) {
//             //     return res.status(404).json({ message: 'Users not found' });
//             // }
            
//             res.status(200).json(users);
//         })
//         .catch((err) => {
//             console.log("error::", err);
//             res.status(500).json({ message: 'Error retrieving users' });
//         });
// });


//posting friend request and updating it in the both the users arrays

// app.post("/friend-request",cors(),async(req,res)=>{
    
//     const {currentUserId,selectedUserId}=req.body

//     console.log("curr",currentUserId)
//     console.log("select",selectedUserId)

//     try{

//         //updating recepient's friendRequestArray
//         await User.findByIdAndUpdate(selectedUserId,{
//             $push:{friendRequests:currentUserId}
//         })
        


//         //updating sender's sentRequest Array
//         await User.findByIdAndUpdate(currentUserId,{

//             $push:{sentFriendRequests:selectedUserId}
//         })


// res.sendStatus(200)
//     }
//     catch(err){
//         console.log("error in sending Request",err)
//         res.sendStatus(500)
//     }

    
// })



//endpoint to show all friend requests of the particular user


// app.get("/friend-request/:userId",cors(),async(req,res)=>{
//     const userId=req.params.userId
//         console.log(userId)

//     try{

        

//         const user=await User.findById(userId).populate("friendRequests","name email image").lean()

//         console.log("USERRR:",user)

//         const friendRequests=user.friendRequests

//        console.log(friendRequests)
//         res.status(200).json(friendRequests)
        
//     }
//     catch(err){

//         console.log("ERROR HANDLING",err)

//         res.status(500).json({message:"errror in retrieving"})

//     }
// })



//endpoints to accept the friend requests and to navigate to the chat directly


// app.post("/friend-request/accept",cors(),async(req,res)=>{

//   try {  
//     const {senderId,recepientId}=req.body

//     const sender=await User.findById(senderId);
//     const recepient=await User.findById(recepientId)

//     sender.friends.push(recepientId);
//     recepient.friends.push(senderId)

//     recepient.friendRequests=recepient.friendRequests.filter(
//         (request)=>{
//             request.toString()!=senderId.toString()
//         })
    
//     sender.sentFriendRequests=sender.sentFriendRequests.filter(
//         (request)=>{
//             request.toString()!=recepientId.toString()
//         }
//     )    

//     await sender.save();
//     await recepient.save();

//     res.status(200).json({message:"friend request accepted successfully"})
// }
// catch(err){
//     console.log("Errror in retrievinfg request",err)
//     res.status(500).json({message:"Error not fount any request"})
// }

    
// })



//endpoint to get all friends of the logged in user


// app.get("/accepted-friends/:userId",cors(),async(req,res)=>{

//     try{

//         const {userId}=req.params
//         const user=await User.findById(userId).populate(
//             "friends",
//             "name email image"
//         )

//         const acceptedFriends=user.friends;
//         res.json(acceptedFriends)

//     }
//     catch(err){
//         console.log("Error in retrieving friends",err)

//         res.status(500).json({message:"Internal Server Error"})
//     }
// })























// // server.js

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 8000;

// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect("mongodb+srv://purvaptl1452:Patel@try1.akekdhm.mongodb.net/")
// .then(() => {
//   console.log("Connected to MongoDB");
// })
// .catch((err) => {
//   console.error("Error connecting to MongoDB:", err);
// });

// // Define a schema for User model
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   image: String
// });

// // Define User model
// const User = mongoose.model('User', userSchema);

// // Route for user registration
// app.post('/register', (req, res) => {
//   const { name, email, password, image } = req.body;

//   console.log("name:",name)
//   // Create new user instance
//   const newUser = new User({ name, email, password, image });
//   console.log("new user:",newUser)
//   // Save the user to the database
//   newUser.save()
//     .then(() => {
//       res.status(200).json({ message: "User registered successfully" });
//     })
//     .catch((err) => {
//       console.error("Error registering user:", err);
//       res.status(500).json({ message: "Error registering user" });
//     });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });









// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");

// // Importing user and message models if defined in separate files
// const User = require("./models/user");
// const Message = require("./models/message");

// const app = express();
// const PORT = 8000;

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Passport configuration if needed
// // app.use(passport.initialize());
// // const LocalStrategy = require("passport-local").Strategy;

// // MongoDB connection
// mongoose.connect("mongodb+srv://purvaptl1452:Patel@try1.akekdhm.mongodb.net/")
// .then(() => {
//   console.log("Connected to MongoDB");
// })
// .catch((err) => {
//   console.error("Error connecting to MongoDB:", err);
// });

// // Route for user registration
// app.post('/register', (req, res) => {
//   const { name, email, password, image } = req.body;

//   // Create new user instance
//   const newUser = new User({ name, email, password, image });

//   // Save the user to the database
//   newUser.save()
//     .then(() => {
//       res.status(200).json({ message: "User registered successfully" });
//     })
//     .catch((err) => {
//       console.error("Error registering user:", err);
//       res.status(500).json({ message: "Error registering user" });
//     });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






















// TYPESCRIPTTTT


// import express, { Request, Response } from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";

// const app = express();
// const PORT: number = 8000;
// import cors from "cors";
// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(passport.initialize());
// import jwt from "jsonwebtoken";

// app.listen(PORT, () => {
//     console.log(`Listening on the PORT ${PORT} . . . `);
// });

// mongoose
//     .connect("mongodb+srv://purvaptl1452:Patel@try1.akekdhm.mongodb.net/")
//     .then(() => {
//         console.log("Connected to MongoDB . . . ");
//     })
//     .catch((err) => {
//         console.log("Error In connecting to MongoDb : ", err);
//     });

// import User from "./models/user";
// import Message from "./models/message";

// app.post('/register/', cors(), (req: Request, res: Response) => {
//     const { name, email, password, image } = req.body;

//     //create new user 
//     const newUser = new User({ name, email, password, image });

//     //save the user to the db
//     newUser
//         .save()
//         .then(() => {
//             res.status(200).json({ message: "User registered Successfully " });
//         })
//         .catch((err) => {
//             console.log("error in registering", err);
//             res.status(500).json({ message: "Error in registering" });
//         });
// });

