const express = require('express')
const projectRoutes = require('./routes/project-routes')
const employeeRoutes = require('./routes/employee-routes')
const app = express()
require('./db/resource')
const port = process.env.PORT || 3000

app.use('/projects', projectRoutes)
app.use('/employees', employeeRoutes)

app.listen(port, _ => console.log(`Server is listening on Port ${port}`))