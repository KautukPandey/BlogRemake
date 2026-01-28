const express = require('express')

const app = express()

// Parses incoming JSON requests and makes data available on req.body
app.use(express.json())

app.get('/health',(req,res)=>{
    res.send('Health route')
})

module.exports = app