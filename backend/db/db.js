const mongoose = require('mongoose');

const db =  () => {
    try {
        mongoose.set('strictQuery', false)
         mongoose.connect(process.env.MONGO_URL)
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error');
    }
}

module.exports = {db}