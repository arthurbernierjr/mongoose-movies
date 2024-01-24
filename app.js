const express = require('express')
const app = express()
const Movie = require('./Movie')
// const performersRouter = require('./routes/performersRouter')

app.use(express.json())
app.use('/movies', Movie.router)
// app.use('/performers', performersRouter)


module.exports = app
