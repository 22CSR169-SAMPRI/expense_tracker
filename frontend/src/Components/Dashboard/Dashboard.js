import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { rupee } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses, getReport } = useGlobalContext()
    const [start,setStart] = useState('');
    const [end,setEnd] = useState('');
    const [reportAvailable,setReportAvailable] = useState([]);

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const report = async () => {
        await getReport(start,end).then((res)=>{
            console.log(res)
            setReportAvailable(res);
        })
        
    }

    const TableComponent = () => {
        try
        {
            if(reportAvailable.length==0)
            {
                return(
                    <div></div>
                )
            }
            const data = reportAvailable;
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
                <button type="button" onClick={downloadJson}>Download</button>
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

    const downloadJson = () => {
        const json = JSON.stringify(reportAvailable, null, 2); // Convert data to JSON string
        const blob = new Blob([json], { type: 'application/json' }); // Create a Blob from the JSON string
        const url = URL.createObjectURL(blob); // Create a URL for the Blob

        const link = document.createElement('a'); // Create a temporary anchor element
        link.href = url; // Set the href to the Blob URL
        link.download = 'data.json'; // Set the desired file name
        document.body.appendChild(link); // Append the link to the document
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Remove the link from the document
        URL.revokeObjectURL(url); // Clean up by revoking the Object URL
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
                        <h1>Get Report</h1>
                        <p>Start Date</p>
                        <input type="datetime-local" value={start} onChange={(e)=>{setStart(e.target.value)}} />
                        <p>End Date</p>
                        <input type="datetime-local" value={end} onChange={(e)=>{setEnd(e.target.value)}} />
                        <button type="button" onClick={report}>send</button>
                        <TableComponent/>
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
        .expense{
        color:#F00;
        }
        .log{
        display: block;
        margin:20px;
        width:100%;
        }
`;

export default Dashboard