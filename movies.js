const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    yearOfRelease:{
        type: Number,
        required: true,
        min: [1900, "There were no movies before that !!"],
        max: [2024, "So you've seen future movies too ?!"]
    },
    genre: {
        type: String,
        required: true,
    },
    leadMaleActor: {
        type: String,
        required: false,
    },
    leadFemaleActor: {
        type: String,
        required: false,
    }

})

module.exports = mongoose.model('Movies', movieSchema);
