// routes/router.js
const express = require("express");
const cron = require("node-cron");
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
  getUserSubscription,
  setSubscription,
} = require("../controllers/user-controller");

const authMiddleware = require("../middleware/authMiddleware"); // Import the middleware

const router = express.Router();

router.post("/register", registerUser);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/login", loginUser);

// Protecting routes
router.post("/uploadImage", authMiddleware, uploadImage);

router.get("/userDetails/:userId", authMiddleware, getUserDetails);

router.get("/users/:userId", authMiddleware, getUsers);

router.post("/friend-request", authMiddleware, friendRequest);

router.get("/friend-request/:userId", authMiddleware, friendRequestList);

router.post("/friend-request/accept", authMiddleware, acceptFriendRequest);

router.get("/accepted-friends/:userId", authMiddleware, friends);

router.get("/friendsPaymentStatus/:userId", authMiddleware, friendsPaymentStatus);

router.post("/editProfile", editProfile);

router.delete("/deleteUser/:userId", softDeleteUser);

router.post("/recoverUser", recoverUser);

cron.schedule("0 0 * * *", async () => {
  await deleteExpiredUsers();
});

router.get("/getSubscription/:userId", authMiddleware, getUserSubscription);

router.post("/setSubscription", authMiddleware, setSubscription);

module.exports = router;

// const express = require("express");

// const {
//   registerUser,
//   loginUser,
//   getUsers,
//   friendRequest,
//   friendRequestList,
//   acceptFriendRequest,
//   friends,
//   sendOtp,
//   verifyOtp,
//   friendsPaymentStatus,
//   getUserDetails,
//   uploadImage,
//   getUserSubscription,
//   setSubscription,
// } = require("../controllers/user-controller");

// const router = express.Router();

// router.post("/register", registerUser);

// router.post("/send-otp", sendOtp);

// router.post("/verify-otp", verifyOtp);

// router.post("/login", loginUser);

// router.post("/uploadImage", uploadImage);

// router.get("/userDetails/:userId", getUserDetails);

// router.get("/users/:userId", getUsers);

// router.post("/friend-request", friendRequest);

// router.get("/friend-request/:userId", friendRequestList);

// router.post("/friend-request/accept", acceptFriendRequest);

// router.get("/accepted-friends/:userId", friends);

// router.get("/friendsPaymentStatus/:userId", friendsPaymentStatus);

// router.get('/getSubscription/:userId', getUserSubscription);

// router.post('/setSubscription', setSubscription);

// module.exports = router;
