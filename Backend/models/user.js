const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    lowerCase:true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "ss",
  },
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sentFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  balance: {
    type: Number,
    default: 0,
  },
  subscriptionType: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    default: null,
  },
  subscriptionStartDate: {
    type: Date,
    default: null,
  },
  subscriptionEndDate: {
    type: Date,
    default: null,
  }
});

userSchema.methods.isSubscribed = function() {
  const today = new Date();
  return this.subscriptionEndDate && this.subscriptionEndDate > today;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
