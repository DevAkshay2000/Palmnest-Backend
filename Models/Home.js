// Schema for Gallery
const mongoose = require("mongoose")
let Carousel = new mongoose.Schema({
    image: {
        type: String,
    },
    title: {
        type: String
    }
})

module.exports = mongoose.model("carousel", Carousel)