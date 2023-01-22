const mongoose = require('mongoose');

const RecepieSchema = mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    ingredients:{
        type: Array,
        required: true,
    },
    preparation: { 
        type: String,
        required: true
    },
    selected: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Recepie',  RecepieSchema)