const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    assignedProjectIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
})

const employeeModel = mongoose.model('Employee', employeeSchema)

module.exports = employeeModel