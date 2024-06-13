const Group = require("../models/group");
const User = require("../models/user");
const Expense=require('../models/expense')

const createGroup = async (req, res) => {
  try {
    const { name, description, members, image } = req.body;

  

    const memberIds = [];

    for (const memberId of members) {
      const user = await User.findById(memberId);

      if (!user) {
        return res.status(400).json({ message: "User not Found" });
      }

      memberIds.push(user._id);
    }
 

    const existingGroup = await Group.aggregate([
      {
        $match: {
          name: name,
          members: { $all: memberIds },
        },
      },
      {
        $addFields: {
          memberCount: { $size: "$members" },
        },
      },
      {
        $match: {
          memberCount: members.length,
        },
      },
    ]);

    if (existingGroup.length !== 0) {
      console.log("exixts");
      return res
        .status(400)
        .json("Gr with same name and members exists Already !!!");
    }

    const group = new Group({
      name,
      description,
      members: memberIds,
      image,
    });

    const newGroup = await group.save();

    await User.updateMany(
      { _id: { $in: memberIds } },
      { $push: { groups: newGroup._id } }
    );

    res.status(200).json(newGroup);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllGroups = async (req, res) => {
  try {
    const userId = req.params.userId;
   

    const user = await User.findById(userId).populate("groups");

    res.status(200).json(user.groups);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};




const fetchGroupPaymentStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("groups");

    const userGroups = user.groups;
    const groupsWithPendingPayments = [];

    for (const group of userGroups) {
      const groupExpenses = await Expense.find({
        groupId: group._id,
        $or: [
          { payerId: userId },
          { "payments.participant": userId }
        ],
      }).populate("payments.participant");

      let groupOwesMe = 0;
      let iOweGroup = 0;

      groupExpenses.forEach((expense) => {
      
        expense.payments.forEach((payment) => {
          if (
            payment.participant._id.toString() === userId &&
            expense.payerId.toString() !== userId &&
            !payment.paid
          ) {
            iOweGroup += payment.amount;
          } else if (
            payment.participant._id.toString() !== userId &&
            expense.payerId.toString() === userId &&
            !payment.paid
          ) {
            groupOwesMe += payment.amount;
          }
        });
      });

      groupsWithPendingPayments.push({
        groupId: group._id,
        groupName: group.name,
        groupOwesMe,
        iOweGroup,
      });
    }
    console.log(groupsWithPendingPayments,"??..")
    res.status(200).json(groupsWithPendingPayments);
  } catch (error) {
    console.log("Error in internal server", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  fetchGroupPaymentStatus
};
