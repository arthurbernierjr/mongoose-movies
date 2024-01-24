const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

class Movie {
 constructor(Model, controller, router){
    this.Model = Model 
    this.controller = controller 
    this.router = router
 }
}

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    mpaaRating: {type: String, required: true },
    cast: [{type: mongoose.Schema.Types.ObjectId, ref: 'Performer'}]
})

const Model = mongoose.model('Movie', movieSchema)
const controller = {
    async show(req, res){
        try {
            const foundMovie = await Model.findOne({_id: req.params.id})
            res.status(200).json(foundMovie)
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    },
    async create(req, res) {
        try {
            const createdMovie = await Model.create(req.body)
            res.status(200).json(createdMovie)
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    },  
    async index(req, res) {
        try {
            const foundMovies = await Model.find({})
            res.status(200).json(foundMovies)
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }   
}

// POST /movies: Accepst Movie Data and Creates A Movie
router.post('/', controller.create)
// GET /movies: Returns a list of all movies.
router.get('/', controller.index)
// GET /movies/:id: Gets An Individual Movie
router.get('/:id', controller.show)
// POST /movies/:movieId/performers/:performerId
// router.post('/:movieId/performers/:performerId', controller.addPerformer)



module.exports = new Movie(Model, controller, router)