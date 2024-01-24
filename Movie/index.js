const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Performer = require('../Performer')


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
            const foundMovie = await Model.findOne({_id: req.params.id}).populate('cast')
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
            const foundMovies = await Model.find({}).populate('cast')
            res.status(200).json(foundMovies)
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    },
    async addPerformer(req, res) {
        try {
            const foundPerformer = await Performer.Model.findOne({ _id: req.params.performerId })
            if(!foundPerformer) throw new Error(`Could not locate performer with id ${req.params.performerId}`)
            const foundMovie = await Movie.findOne({ _id: req.params.movieId })
            if(!foundMovie) throw new Error(`Could not locate movie with id ${req.params.movieId}`)
            // many to many
            foundMovie.cast.push(foundPerformer._id)
            foundPerformer.credits.push(foundMovie._id)
            await foundMovie.save()
            await foundPerformer.save()
            res.status(200).json({
                msg: `Sucessfully associate performer with id ${req.params.performerId} with movie with id ${req.params.movieId} `,
                movie: foundMovie,
                performer: foundPerformer
            })
        } catch (error) {
            res.status(400).json({ msg: error.message })
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
router.post('/:movieId/performers/:performerId', controller.addPerformer)



module.exports = new Movie(Model, controller, router)