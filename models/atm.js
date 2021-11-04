const mongoose = require('mongoose')

const AtmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Atm', AtmSchema)