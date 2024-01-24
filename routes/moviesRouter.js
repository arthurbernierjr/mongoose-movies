const express = require('express')
const router = express.Router()
const movieCtrl = require('../controllers/moviesController')

// POST /movies: Accepst Movie Data and Creates A Movie
router.post('/', movieCtrl.create)
// GET /movies: Returns a list of all movies.
router.get('/', movieCtrl.index)
// GET /movies/:id: Gets An Individual Movie
router.get('/:id', movieCtrl.show)
// POST /movies/:movieId/performers/:performerId
router.post('/:movieId/performers/:performerId', movieCtrl.addPerformer)

module.exports = router