const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const authRoutes = require('./routes/authRoutes')
// Parses incoming JSON requests and makes data available on req.body
app.use(express.json())

app.use(cookieParser())

app.use('/auth',authRoutes)

app.get('/health',(req,res)=>{
    res.send('Health route')
})

module.exports = app