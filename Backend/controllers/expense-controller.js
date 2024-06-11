const Expense = require("../models/expense");
const Group = require("../models/group");
const User = require("../models/user");

const addExpense = async (req, res) => {
  try {
    console.log("expense Initiated");
    const { description, amount, payerId, payeeId, groupId, type } = req.body;
    const part = [...payeeId, payerId];
    const uniqueParticipants = [...new Set(part)];

    const splitAmount = amount / uniqueParticipants.length;
    console.log(splitAmount);

    const payments = uniqueParticipants.map((participantId) => ({
      participant: participantId,
      amount: splitAmount,
      paid: participantId.toString() === payerId.toString(), // Set paid to true if participant is payerId
    }));

    const newExpense = new Expense({
      description,
      amount,
      payerId,
      participants: uniqueParticipants,
      groupId,
      type,
      payments,
    });

    console.log("NEW EXPP", newExpense);
    await newExpense.save();

    for (participantId of uniqueParticipants) {
      await User.findByIdAndUpdate(participantId, {
        $inc: { balance: -splitAmount },
        $push: { expenses: newExpense._id },
      });
    }

    if (groupId) {
      await Group.findByIdAndUpdate(groupId, {
        $push: { expenses: newExpense._id },
      });
    }

    console.log("ONE_TO_ONE expens cerated successfully");
    res
      .status(200)
      .json({ message: "One-to-one expense created successfully !!!" });
  } catch (error) {
    console.log("Error in internal server", error);
  }
};

const expenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const { expenseType } = req.query;

    const query = expenseType ? { type: expenseType } : {};

    const user = await User.findById(userId).populate({
      path: "expenses",
      match: query,
    });

    if (!user) {
      return res.status(404).json({ message: "User Not Found !!!" });
    }

    res.status(200).json({ expenses: user.expenses });
  } catch (error) {
    console.log("internal server Error:", error);
    res.status(404);
  }
};

const expense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    console.log("ID", expenseId);

    const expense = await Expense.findById(expenseId)
      .populate("participants")
      .populate("payments.participant");

    const perParticipantAmount = (
      expense.amount / expense.participants.length
    ).toFixed(2);

    expense.participants.forEach((participant) => {
      const payment = expense.payments.find(
        (p) => p.participant._id.toString() === participant._id.toString()
      );

      if (!payment) {
        expense.payments.push({
          participant: participant._id,
          amount: perParticipantAmount,
          paid: false,
        });
      } else {
        payment.amount = perParticipantAmount;
      }
    });

    const allPaid = expense.payments.every((payment) => payment.paid);
    expense.settled = allPaid;

    await expense.save();

    res.status(200).json(expense);
  } catch (error) {
    console.log("error in internal server", error);
    res.status(404).json({ message: "internal server error" });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    console.log("BACK");
    const { expenseId, participantId, paid } = req.body;

    console.log(expenseId, participantId, paid, "+++++++++++");

    const expense = await Expense.findById(expenseId);

    const payment = expense.payments.find(
      (p) => p.participant._id.toString() === participantId
    );

    payment.paid = paid;

    const allPaid = expense.payments.every((payment) => payment.paid);
    expense.settled = allPaid;

    await expense.save();
    res.status(200).json(expense);
  } catch (error) {
    console.log("Error in internal server", error);
    res.status(404).json({ message: "Internal server Error" });
  }
};

const getGroupExpenses = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    const expenses = await Expense.find({ groupId });

    res.status(200).json(expenses);
  } catch (error) {
    console.log("internal server error", error);
    res.status(500).json({ message: "server error" });
  }
};

const userExpenses = async (req, res) => {
  try {
    console.log("uerExpens");

    const { userId, friendId } = req.params;
    console.log(userId, friendId);

    const expenses = await Expense.find({
      participants: { $all: [userId, friendId] },
    });

    console.log(expenses, "??");

    res.status(200).json(expenses);
  } catch (error) {
    console.log("internal server error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  addExpense,
  expenses,
  expense,
  updatePaymentStatus,
  getGroupExpenses,
  userExpenses,
};
