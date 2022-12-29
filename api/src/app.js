require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/auth')
const dashboardRoute = require('./routes/dashboard')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRoute)
app.use('/', dashboardRoute)

module.exports = app