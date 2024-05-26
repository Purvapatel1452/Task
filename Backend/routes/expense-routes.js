const express=require('express');
const { addExpense, expenses, expense } = require('../controllers/expense-controller');

const expenseRouter=express.Router();



expenseRouter.post('/addExpense',addExpense)

expenseRouter.get('/expenses/:userId',expenses)

expenseRouter.get('/expense/:expenseId',expense)





module.exports=expenseRouter