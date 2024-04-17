const express=require('express')


const { messages, userDetails, chatMessages } = require('../controllers/message-controller');
const Message=require('../models/message');

const msgRouter=express.Router();



//to upload a image using multer

const multer = require("multer");

console.log("helloooooo")

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const destinationPath = path.join(__dirname,'react_native','final_demo_copy-chat','Chat-RN_App','Chat','assets'); // Adjust the folder structure as per your requirement
    cb(null, 'files/');
    // cb(null, "files/"); // Specify the desired destination folder
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });



msgRouter.post('/messages',upload.single('imageFile'),messages)

msgRouter.get('/user/:userId',userDetails)

msgRouter.get('/messages/:senderId/:recepientId',chatMessages);




module.exports=msgRouter