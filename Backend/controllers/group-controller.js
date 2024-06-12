const Group = require("../models/group");
const User = require("../models/user");
const Expense=require('../models/expense')

const createGroup = async (req, res) => {
  try {
    const { name, description, members, image } = req.body;

    console.log(name, description, members, image);

    const memberIds = [];

    for (const memberId of members) {
      const user = await User.findById(memberId);

      if (!user) {
        return res.status(400).json({ message: "User not Found" });
      }

      memberIds.push(user._id);
    }
    console.log("all", { $al: memberIds });

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
    console.log(userId);

    const user = await User.findById(userId).populate("groups");

    res.status(200).json(user.groups);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};





const fetchGroupPaymentStatus = async (req, res) => {
  try {
    console.log("PAUY")
    const { userId } = req.params;
    console.log(userId, "********");

    // Find the user and populate their groups
    const user = await User.findById(userId).populate("groups");

    const userGroups = user.groups;
    const groupPaymentStatus = [];

    for (const group of userGroups) {
      const expenses = await Expense.find({
        groupId: group._id,
        participants: userId,
      });

      let groupOwesMe = 0;
      let iOweGroup = 0;

      expenses.forEach((expense) => {
        expense.payments.forEach((payment) => {
          console.log(
            payment.participant._id.toString(),
            userId,
            "+++++++++++",
            expense.payerId._id.toString(),
            group._id.toString()
          );
          if (
            payment.participant._id.toString() === userId &&
            !payment.paid
          ) {
            iOweGroup += payment.amount;
            console.log("IIIIIII");
          } else if (
            expense.payerId._id.toString() === userId &&
            !payment.paid
          ) {
            groupOwesMe += payment.amount;
            console.log("ffffffffffff");
          }
        });
      });

      groupPaymentStatus.push({
        groupId: group._id,
        groupName: group.name,
        groupOwesMe,
        iOweGroup,
      });
    }

    res.status(200).json(groupPaymentStatus);
  } catch (error) {
    console.log("Error in internal server", error);
    res.status(500).json({ error: "internal server error" });
  }
};



module.exports = {
  createGroup,
  getAllGroups,
  fetchGroupPaymentStatus
};
