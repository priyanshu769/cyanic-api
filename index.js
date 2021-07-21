const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

// DB Connect
const initializeDBConnect = require('./db/db.connect')
initializeDBConnect()

// Routers
const videos = require('./routers/videos.v1.router')

app.use('/videos', videos)

app.get('/', (req, res) => {
  res.send("Hello! I'm Cyanic API.")
})

app.listen(3000, () => {
  console.log('Server running on port 3000...')
})
