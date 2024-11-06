const IncomeSchema= require("../models/IncomeModel")
const ExpenseSchema = require("../models/ExpenseModel")

exports.getReport = async (req,res) => {
    try{
        let {start,end} = req.body
        start = new Date(start)
        end = new Date(end)
        const query = {
            createdAt: {
                $gte: start,
                $lte: end
            }
        };
        const incomes = await IncomeSchema.find(query).sort({createdAt: -1})
        const expenses = await ExpenseSchema.find(query).sort({createdAt: -1})
        const report = [...incomes, ...expenses]
        report.sort((a,b)=>new Date(b.date)-new Date(a.date))
        res.send(report)
    }
    catch(err)
    {
        console.log(err)
        res.json({message:"Server Error"})
    }
}