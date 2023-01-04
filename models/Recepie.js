const mongoose = require('mongoose');

const RecepieSchema = mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    ingredeants:{
        type: Array,
        required: true,
    },
    preparation: { 
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Recepie',  RecepieSchema)