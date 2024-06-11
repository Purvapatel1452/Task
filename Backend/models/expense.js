const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
});

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  payments: [paymentSchema],
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["group", "non-group"],
    required: true,
  },
  settled: {
    type: Boolean,
    default: false,
  },
});

expenseSchema.pre("find", function () {
  this.populate("payerId", "_id name image")
    .populate("participants", "_id name image")
    .populate("payments.participant", "_id name image");
});

expenseSchema.pre("findOne", function () {
  this.populate("payerId", "_id name image")
    .populate("participants", "_id name image")
    .populate("payments.participant", "_id name image");
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
