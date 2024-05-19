require('dotenv').config()
require('express-async-errors')
const cors = require('cors')

const express = require('express')
const connectDB = require('./db/connect')

// router imports
const hotelRouter = require('./routes/hotel')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const roomRouter = require('./routes/room')
// middleware imports
const errorHandlerMiddleware = require('./middleware/error-handler')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/hotels', hotelRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/room', roomRouter)


app.use(errorHandlerMiddleware)

const start = ()=>{
    connectDB(process.env.MONGO_URI)
    app.listen(port, ()=>{
        console.log(`Server at http://localhost:${port}`)
    })
}

start()