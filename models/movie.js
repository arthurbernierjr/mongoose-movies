const mongoose = require('mongoose')


// title, releaseYear, mpaaRating, and cast.
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  mpaaRating: {type: String, required: true },
  cast: [{type: mongoose.Schema.Types.ObjectId, ref: 'Performer'}]
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie