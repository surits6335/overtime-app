const express = require('express')
const Employee = require('../db/models/employee')
const Project = require('../db/models/project')
const router = new express.Router()

router.use(express.json())

router.post('/', async (req, res) => {
    try {
        let savedEmployee = []
        if (req.body.length > 0) {
            savedEmployee = await Employee.insertMany(req.body)
        }
        else {
            const employee = new Employee(req.body)
            savedEmployee = await employee.save()
        }
        res.send(savedEmployee)
    }
    catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
})

router.patch('/', async (req, res) => {
    try {
        const selectedProject = await Project.findById(req.body.proposedProjectId)
        if (!selectedProject) { return res.status(404).send('Project not found') }
        for (let i = 0; i < req.body.addedEmployeeIds.length; i++) {
            const selectedEmployee = await Employee.findById(req.body.addedEmployeeIds[i])
            if (!selectedEmployee) { return res.status(404).send(`Assigned Employee not found of id ${req.body.addedEmployeeIds[i]}`) }
            if (selectedEmployee.assignedProjectIds.indexOf(req.body.proposedProjectId) === -1) {
                selectedEmployee.assignedProjectIds.push(req.body.proposedProjectId)
            }
            await selectedEmployee.save()
        }
        for (let i = 0; i < req.body.removedEmployeeIds.length; i++) {
            const selectedEmployee = await Employee.findById(req.body.removedEmployeeIds[i])
            if (!selectedEmployee) { return res.status(404).send(`Assigned Employee not found of id ${req.body.removedEmployeeIds[i]}`) }
            selectedEmployee.assignedProjectIds = selectedEmployee.assignedProjectIds.filter(id => id != req.body.proposedProjectId)
            await selectedEmployee.save()
        }
        res.send({})

    }
    catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const selectedEmployee = await Employee.find()
        res.send(selectedEmployee)
    }
    catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const selectedEmployee = await Employee.findById(req.params.id)
        if (!selectedEmployee) { return res.status(404).send('Employee not found') }
        res.send(selectedEmployee)
    }
    catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
})

module.exports = router