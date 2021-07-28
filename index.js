const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

// Middlewares
const errorHandler404 = require('./middlewares/errorHandler404.middleware')
const errorHandler500 = require('./middlewares/errorHandler500.middleware')

// DB Connect
const initializeDBConnect = require('./db/db.connect')
initializeDBConnect()

// Routers
const videos = require('./routers/videos.v1.router')
const users = require('./routers/users.v1.router')

app.use('/videos', videos)
app.use('/users', users)

app.get('/', (req, res) => {
  res.send("Hello! I'm Cyanic API.")
})

app.use(errorHandler404)
app.use(errorHandler500)

app.listen(3000, () => {
  console.log('Server running on port 3000...')
})
