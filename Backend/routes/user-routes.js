const express=require('express')

const { registerUser, loginUser, getUsers, friendRequest, friendRequestList, acceptFriendRequest, friends, sendOtp, verifyOtp } = require('../controllers/user-controller')




const router=express.Router()


router.post('/register',registerUser)

router.post('/send-otp',sendOtp)

router.post('/verify-otp',verifyOtp)

router.post("/login",loginUser)

router.get('/users/:userId',getUsers)

router.post("/friend-request",friendRequest)

router.get("/friend-request/:userId",friendRequestList)

router.post("/friend-request/accept",acceptFriendRequest)

router.get("/accepted-friends/:userId",friends)



module.exports=router

