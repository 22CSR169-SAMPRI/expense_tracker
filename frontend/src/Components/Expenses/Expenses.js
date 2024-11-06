import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import { PieChart } from '@mui/x-charts/PieChart';

function Expenses() {
    const {addIncome,expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])

    const processData = () => {
        const expenseData = expenses
        .map(item => ({ ...item, amount: parseFloat(item.amount) }));
    
    // Sort income data in descending order by amount
    expenseData.sort((a, b) => b.amount - a.amount);

    // Separate the top 4 and the rest
    const top4Expense = expenseData.slice(0, 4);
    const otherExpenseAmount = expenseData.slice(4).reduce((sum, item) => sum + item.amount, 0);

    // Format the result as required
    const result = top4Expense.map(item => ({
        label: item.category,
        value: item.amount,
    }));

    // Add the "Other Income" if applicable
    if (otherExpenseAmount > 0) {
        result.push({
            label: "Other",
            value: otherExpenseAmount,
        });
    }

    // console.log("data",result);
    const combinedData = {};

    let id=1;
    // Loop through the data and aggregate values by label
    result.forEach(item => {
        if (combinedData[item.label]) {
            combinedData[item.label] += item.value;
        } else {
            combinedData[item.label] = item.value;
        }
        // combinedData[item.id] = id;
        // id++;
    });

    // Convert the combined data object to an array

    const resultcombined =  Object.keys(combinedData).map(label => ({
        label: label,
        value: combinedData[label],
        id: id++
    }));
    console.log("data",resultcombined);
    return resultcombined;
    }

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total Expense: <span>₹{totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            console.log(income)
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
                <h1>Pie Chart Representing the Expenses based on Categories</h1>
                <PieChart
                    series={[
                        {
                            data:processData()
                        },
                    ]}
                    width={400}
                    height={200}
                    />
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Expenses