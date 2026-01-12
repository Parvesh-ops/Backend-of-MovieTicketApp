import mongoose from "mongoose";

//Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    backdrop_path: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    original_language: {
        type: String,
    },
    tagline: {
        type: String,
    },
    genres: {
        type: [String],
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    vote_Average: {
        type: Number,
        required: true
    },
    runtime: {
        type: Number,
        required: true
    },
},
    { timestamps: true })

//model
const movie = mongoose.model('Movie', movieSchema)

export default movie