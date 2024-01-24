const Performer = require('../models/performer')
const Movie = require('../models/movie')

/*
//  GET /performers: Returns a list of all performers.
router.get('/', performerCtrl.index)
// POST /performers: Accepts performer data and creates a new performer.
router.post('/', performerCtrl.create)
*/


exports.index = async (req, res) => {
    try {
        const performers = await Performer.find({})
        res.status(200).json(performers)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

exports.create = async (req, res) => {
    try {
        const createdPerformer = await Performer.create(req.body)
        res.status(200).json(createdPerformer)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

exports.addPerformer = async function addPerformer(req, res) {
    try {
        const foundPerformer = await Performer.findOne({ _id: req.params.performerId })
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

