const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()

// app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/index.html'))
})

let port = process.env.PORT

app.listen(port)
