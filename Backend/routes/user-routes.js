const express = require("express");
const cron = require('node-cron');

const {
  registerUser,
  loginUser,
  getUsers,
  friendRequest,
  friendRequestList,
  acceptFriendRequest,
  friends,
  sendOtp,
  verifyOtp,
  friendsPaymentStatus,
  getUserDetails,
  uploadImage,
  editProfile,
  softDeleteUser,
  recoverUser,
  deleteExpiredUsers,
} = require("../controllers/user-controller");

const router = express.Router();

router.post("/register", registerUser);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/login", loginUser);

router.post("/uploadImage", uploadImage);

router.get("/userDetails/:userId", getUserDetails);

router.get("/users/:userId", getUsers);

router.post("/friend-request", friendRequest);

router.get("/friend-request/:userId", friendRequestList);

router.post("/friend-request/accept", acceptFriendRequest);

router.get("/accepted-friends/:userId", friends);

router.get("/friendsPaymentStatus/:userId", friendsPaymentStatus);

router.post('/editProfile', editProfile);

router.delete('/deleteUser/:userId', softDeleteUser);

router.post('/recoverUser',recoverUser);

cron.schedule('0 0 * * *', async () => {
  await deleteExpiredUsers();
});

module.exports = router;
