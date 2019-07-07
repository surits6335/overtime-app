const mongoose = require('mongoose')

const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/organisation', {
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log('Connected to database')
    }
    catch(error) {
        console.log(error)
    }
}


module.exports = connectDatabase()