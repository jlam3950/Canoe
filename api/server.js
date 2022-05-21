const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/index.html'))
})

app.use(express.static(path.join(__dirname, '../public')))






app.get('/send', (req, res) => {
  keys = {
    aviationKey: process.env.AVIATION_TRACKER,
    tequilaKey: process.env.TEQUILA_API_KEY
  }
  res.json(keys)
})

// console.log(test.then(key => console.log(key)))


let port = process.env.PORT

app.listen(port)
