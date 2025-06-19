const express = require('express')
const connectDB = require('./config/db')
const carRouter = require('./routes/car.routes')
const { requestLogger } = require('./middlewares/logger')
const { errorHandler } = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000

connectDB()
app.use(express.json())
app.use(requestLogger)
app.use('/api/cars', carRouter)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Car API running on port ${PORT}`))
