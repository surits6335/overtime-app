const express = require('express')
const Project = require('../db/models/project')
const router = new express.Router()

router.use(express.json())

router.post('/', async (req, res) => {
    try {
        let savedProject = []
        if (req.body.length > 0) {
            savedProject = await Project.insertMany(req.body)
        }
        else {
            const project = new Project(req.body)
            savedProject = await project.save()
        }
        res.send(savedProject)
    }
    catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        let project = await Project.findById(req.params.id)
        if(!project) { return res.status(404).send('Project not found') }
        project.shifts = req.body
        const updatedProject = await project.save()
        res.send(updatedProject)
    }
    catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find()
        res.send(projects)
    }
    catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
})

router.get('/:id', async (req, res) => {
    
    try {
        const selectedProject = await Project.findById(req.params.id)
        if(!selectedProject) { return res.status(404).send('Project not found') }
        res.send(selectedProject)
    }
    catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
})

router.get('/getAssignedEmployees/:id', async (req, res) => {
    
    try {
        const selectedProject = await Project.findById(req.params.id)
        if(!selectedProject) { return res.status(404).send('Project not found') }
        await selectedProject.populate('assignedEmployees').execPopulate()
        res.send(selectedProject.assignedEmployees)
    }
    catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
})

router.delete('/:id', async(req, res) => {
    try {
        let selectedProject = await Project.findById(req.params.id)
        if(!selectedProject) { return res.status(404).send('Project not found') }
        selectedProject.shifts = [ ]
        const updatedProject = await selectedProject.save()
        res.send(updatedProject)
    }
    catch(error) {
        res.status(400).send(error.message)
        console.log(error)
    }
})

module.exports = router