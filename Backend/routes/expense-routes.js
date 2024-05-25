const express=require('express');
const { addExpense, expenses } = require('../controllers/expense-controller');

const expenseRouter=express.Router();



expenseRouter.post('/addExpense',addExpense)

expenseRouter.get('/expenses/:userId',expenses)



module.exports=expenseRouter