const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/index.html'))
})

app.get('/tracker', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/tracker.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/login.html'))
})


app.use(express.static(path.join(__dirname, '../public')))



app.get('/firebase', (req, res) =>{
  fireConfig = {
    key: process.env.FIREBASE_KEY,
    domain: process.env.FIREBASE_DOMAIN,
    id: process.env.FIREBASE_ID,
    bucket: process.env.FIREBASE_BUCKET,
    messagingSender: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appID: process.env.FIREBASE_APP_ID
  }
  res.json(fireConfig)
})


app.get('/send', (req, res) => {
  keys = {
    airLabKey: process.env.AIRLAB_TRACKER,
    tequilaKey: process.env.TEQUILA_API_KEY
  }
  res.json(keys)
})



// console.log(test.then(key => console.log(key)))


let port = process.env.PORT

app.listen(port)
