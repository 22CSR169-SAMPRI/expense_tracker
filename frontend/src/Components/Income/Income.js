import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { PieChart } from '@mui/x-charts/PieChart';

function Income() {
    const {addIncome,incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [])

    const processData = () => {
        const incomeData = incomes
        .map(item => ({ ...item, amount: parseFloat(item.amount) }));
    
    // Sort income data in descending order by amount
    incomeData.sort((a, b) => b.amount - a.amount);

    // Separate the top 4 and the rest
    const top4Income = incomeData.slice(0, 4);
    const otherIncomeAmount = incomeData.slice(4).reduce((sum, item) => sum + item.amount, 0);

    // Format the result as required
    const result = top4Income.map(item => ({
        label: item.category,
        value: item.amount,
    }));

    // Add the "Other Income" if applicable
    if (otherIncomeAmount > 0) {
        result.push({
            label: "Other",
            value: otherIncomeAmount,
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
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>₹{totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
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
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
                <h1>Pie Chart representing the Income based on Categories</h1>
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
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
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

export default Income