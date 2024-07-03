const mongoose = require('mongoose')

const musicSchema = mongoose.Schema(
    {
        song: {
            type: String,
            required: [true, "Please enter a song name." ]
        },

        artist: {
            type: String,
            required: true
        },

        genre: {
            type: String,
            required: false
        },

        duration: {
            type: Number, // Store duration in minutes
            required: false
        },
    
        releaseDate: {
            type: Date, // Use Date type for releaseDate
            required: false
        }

    },
    {
        timestamps: true
    }
)

const Music = mongoose.model('Music', musicSchema);
module.exports = Music;
