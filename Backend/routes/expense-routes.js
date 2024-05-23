const express=require('express');
const { addExpense } = require('../controllers/expense-controller');

const expenseRouter=express.Router();



expenseRouter.post('/addExpense',addExpense)



module.exports=expenseRouter