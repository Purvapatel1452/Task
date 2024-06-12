const express = require("express");

const {
  createGroup,
  getAllGroups,
  fetchGroupPaymentStatus,
} = require("../controllers/group-controller");

const groupRouter = express.Router();

groupRouter.post("/createGroup", createGroup);

groupRouter.get("/groups/:userId", getAllGroups);

groupRouter.get('/groupPaymentStatus/:userId',fetchGroupPaymentStatus) 


module.exports = groupRouter;
