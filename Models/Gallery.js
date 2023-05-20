// Schema for Gallery
const mongoose = require("mongoose")
let Gallery = new mongoose.Schema({
    image: {
        type: String,
    }
})

module.exports = mongoose.model("gallery", Gallery)