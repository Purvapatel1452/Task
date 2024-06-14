const express = require("express");

const {
  createGroup,
  getAllGroups,
  fetchGroupPaymentStatus,
  uploadGroupImage,
} = require("../controllers/group-controller");

const groupRouter = express.Router();

groupRouter.post("/createGroup", createGroup);

groupRouter.get("/groups/:userId", getAllGroups);

groupRouter.get('/groupPaymentStatus/:userId',fetchGroupPaymentStatus) 

groupRouter.post('/uploadGroupImage',uploadGroupImage) 


module.exports = groupRouter;
