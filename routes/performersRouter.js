const express = require('express')
const router = express.Router()
const performerCtrl = require('../controllers/performersController')


//  GET /performers: Returns a list of all performers.
router.get('/', performerCtrl.index)
// POST /performers: Accepts performer data and creates a new performer.
router.post('/', performerCtrl.create)
// POST /performers/:performerId/movies/:movieId/
router.post('/:performerId/movies/:movieId',  performerCtrl.addPerformer)

module.exports = router