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
const user = require('./routers/user.v1.router')
const login = require('./routers/login.router')
const signup = require('./routers/signup.router')
const playlists = require('./routers/playlists.router')

app.use('/videos', videos)
app.use('/user', user)
app.use('/login', login)
app.use('/signup', signup)
app.use('/playlists', playlists)

app.get('/', (req, res) => {
  res.send("Hello! I'm Cyanic API.")
})

app.use(errorHandler404)
app.use(errorHandler500)

const PORT = 8000

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
