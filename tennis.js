const mongoose = require('mongoose');

const player = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true,
        min: 0,
        max: 60
    },
    matchesPlayed: {
        type: Number,
        required: true,
        min: 0
    },
    matchesWon: {
        type: Number,
        reequire: true,
        min: 0
    },
    slamsWon: {
        type: Number,
        required: true,
        min: 0
    }

})

module.exports = mongoose.model('Player', player);