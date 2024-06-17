const Group = require("../models/group");
const User = require("../models/user");
const Expense=require('../models/expense')

const createGroup = async (req, res) => {
  try {
    console.log("HELLO")
    const { name, description, members, image,adminId } = req.body;

  
    const adminUser = await User.findById(adminId);
    if (!adminUser) {
      return res.status(400).json({ message: "Admin user not found" });
    }


    const memberIds = [];

    for (const memberId of members) {
      const user = await User.findById(memberId);

      if (!user) {
        return res.status(400).json({ message: "User not Found" });
      }

      memberIds.push(user._id);
    }
   
    if ((memberIds.includes(adminUser._id))) {
  
   
      memberIds.push(adminUser._id);
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
      admin: adminUser._id,
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
            expense.payerId._id.toString() !== userId &&
            payment.paid===false
          ) {
            iOweGroup += payment.amount;

          } 
     
           if (
            payment.participant._id.toString() !== userId &&
            expense.payerId._id.toString() === userId &&
            payment.paid===false
          ) {
            groupOwesMe += payment.amount;
    
          }
          console.log(">>>>")
          console.log(expense.description)
          console.log(payment.participant._id.toString()=== userId,payment.participant._id.toString(),':::::',userId)
          console.log( expense.payerId._id.toString()=== userId,expense.payerId._id.toString(),":::::::", userId )
          console.log(   payment.paid===false,":::::",payment.paid )     
          console.log(">>>>")     
        });
      });

      groupsWithPendingPayments.push({
        groupId: group._id,
        groupName: group.name,
        groupOwesMe,
        iOweGroup,
      });
      // console.log(groupExpenses[1].payments[1],"::,,")
    }

    res.status(200).json(groupsWithPendingPayments);
  } catch (error) {
    console.log("Error in internal server", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const uploadGroupImage = async (req, res) => {
  const { groupId, imageUrl } = req.body;

  if (!groupId || !imageUrl) {
    return res
      .status(400)
      .json({ message: "User ID and image URL are required" });
  }

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    group.image = imageUrl;
    await group.save();

    res.status(200).json({ message: "Image updated successfully", group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




const editGroupDetails = async (req, res) => {
  try {
    console.log("ff")
    const { groupId } = req.params;
    console.log(groupId,"PI")
    const { name, description, members, image, adminId } = req.body;
    console.log(name, description, members, image, adminId,"PI")
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    console.log(group.admin)

    // Check if the requesting user is the admin
    if (group.admin.toString() !== adminId) {
      return res.status(403).json({ message: "Only the admin can edit the group details" });
    }

    if (name) group.name = name;
    if (description) group.description = description;
    if (image) group.image = image;

    if (members) {
      const memberIds = [];

      for (const memberId of members) {
        const user = await User.findById(memberId);

        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }

        memberIds.push(user._id);
      }

      // Ensure admin is always in the members list
      if (memberIds.includes(group.admin.toString())) {
        memberIds.push(group.admin);
      }

      group.members = memberIds;

      await User.updateMany(
        { _id: { $in: memberIds } },
        { $addToSet: { groups: group._id } }
      );
    }

    const updatedGroup = await group.save();

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createGroup,
  getAllGroups,
  fetchGroupPaymentStatus,
  uploadGroupImage,
  editGroupDetails
};
