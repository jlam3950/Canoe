const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/index.html'))
})

app.use(express.static(path.join(__dirname, '../public')))



testData = JSON.parse('{"hello": "world"}')


app.get('/send', (req, res) => {
  res.json(testData)
})




let port = process.env.PORT

app.listen(port)
