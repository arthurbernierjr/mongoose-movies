require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('MongoDB is running you better go catch it')
})

app.listen(PORT, () => {
    console.log('We in the building')
})