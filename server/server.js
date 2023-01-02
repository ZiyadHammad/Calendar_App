const connectDB = require('./config/db')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')

connectDB()

const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/events', require('./routes/eventRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))

console.log('Hello world')