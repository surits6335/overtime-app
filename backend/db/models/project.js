const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    shifts: [{
        shiftName: {
            type: String,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        shiftAllowance: {
            type: Number,
            required: true
        }
    }]
})

projectSchema.virtual('assignedEmployees', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'assignedProjectIds'
})

const projectModel = mongoose.model('Project', projectSchema)
module.exports = projectModel