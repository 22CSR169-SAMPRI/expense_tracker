import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { rupee } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Transaction() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses, incomeTransaction, expenseTransaction, getIncomeLog, getExpenseLog } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
        getIncomeLog()
        getExpenseLog()
    }, [])

    const TableComponent = ({}) => {
        try
        {
        const data = [...incomeTransaction, ...expenseTransaction]
        data.sort((a,b)=>new Date(b.date)-new Date(a.date))
        const headers = Object.keys(data[0]);
        console.log(headers);
    
        return (
            <div className="log">
                <table border="1" cellPadding="20" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.type=="income" ? item.amount : <p className="expense">-{item.amount}</p>}</td>
                                <td>{item.category}</td>
                                <td>{item.date.slice(0,10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    catch(err)
    {
        return(
            <div>Hello</div>
        )
    }
    };

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {rupee} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {rupee} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {rupee} {totalBalance()}
                                </p>
                            </div>
                        </div>
                        <h1>Last 3 Months Transactions</h1>
                        <div className="table">
                        <TableComponent/>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>
                            ₹{Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                            ₹{Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                            ₹{Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                            ₹{Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
        .table{
        display: flex;
        flex-direction: row;
        width:150%;
        padding:10px;
        }
        .log{
        display: block;
        margin:20px;
        width:100%;
        }
        /* Basic table setup */
table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    border-radius:20px;
}

/* Table header styling */
th {
    background-color: #AAA;
    color: white;
    padding: 12px;
    text-align: left;
    font-weight: bold;
}

/* Table cell styling */
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

/* Alternating row colors */
tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:nth-child(odd) {
    background-color: #fff;
}

/* Hover effect */
tr:hover {
    background-color: #f1f1f1;
}

/* Responsive styling */
@media (max-width: 600px) {
    table, th, td {
        display: block;
        width: 100%;
    }
    th, td {
        text-align: right;
        padding-left: 50%;
        position: relative;
    }
    th::before, td::before {
        content: attr(data-label);
        position: absolute;
        left: 15px;
        font-weight: bold;
    }
}
    .expense{
    color:#F00;
    }

`;

export default Transaction