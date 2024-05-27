const express=require('express');
const { addExpense, expenses, expense, updatePaymentStatus } = require('../controllers/expense-controller');

const expenseRouter=express.Router();



expenseRouter.post('/addExpense',addExpense)

expenseRouter.get('/expenses/:userId',expenses)

expenseRouter.get('/expense/:expenseId',expense)

expenseRouter.post('/paymentStatus',updatePaymentStatus)





module.exports=expenseRouter