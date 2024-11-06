const { addExpense, getExpense, deleteExpense, getExpenseLog } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, getIncomeLog } = require('../controllers/income');
const { getReport } = require('../controllers/report');

const router = require('express').Router();


router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .get('/get-income-log',getIncomeLog)
    .get('/get-expense-log',getExpenseLog)
    .post('/get-report',getReport)

module.exports = router