import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'

import authRoute from './routes/auth'
import dashboardRoute from './routes/dashboard'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRoute)
app.use('/', dashboardRoute)

export default app