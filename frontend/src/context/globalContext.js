import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "https://expense-tracker-2-s91b.onrender.com";

// http://localhost:5000/api/v1/
const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [incomeTransaction,setIncomeTransaction] = useState([]);
    const [expenseTransaction,setExpenseTransaction] = useState([]);

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`http://localhost:5000/api/v1/get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })

        return history.slice(0, 3)
    }

    const getIncomeLog = async () => {
        const result = await axios.get(`${BASE_URL}get-income-log`)
        const income = result.data
        income.map((item)=>({
            ...item,
            type:"income"
        }))
        setIncomeTransaction(income)

    }
    const getExpenseLog = async () => {
        const result = await axios.get(`${BASE_URL}get-expense-log`)
        const expense = result.data
        console.log(expense)
        setExpenseTransaction(expense)

    }

    const getReport = async (start,end) => {
        console.log(start,end)
        const result = await axios.post(`${BASE_URL}get-report`,{start:start,end:end})
        return result.data
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            incomeTransaction,
            expenseTransaction,
            getIncomeLog,
            getExpenseLog,
            getReport
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}