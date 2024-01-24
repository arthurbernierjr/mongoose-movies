const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

class Performer {
    constructor(Model, controller, router){
       this.Model = Model 
       this.controller = controller 
       this.router = router
    }
   }

const performerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: String, required: true },
    credits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
})


const Model = mongoose.model('Performer',performerSchema)

const controller = {
    async index (req, res) {
        try {
            const performers = await Model.find({}).populate('credits')
            res.status(200).json(performers)
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    },
    async create (req, res) {
        try {
            const createdPerformer = await Model.create(req.body)
            res.status(200).json(createdPerformer)
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}

router.get('/', controller.index)
router.post('/', controller.create)

module.exports = new Performer(Model, controller, router)