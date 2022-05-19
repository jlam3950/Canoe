const express = require('express')
const path = require('path')

const app = express()

// app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/index.html'))
})

app.listen(3000)
