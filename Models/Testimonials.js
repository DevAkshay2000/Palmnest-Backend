// Schema for Gallery
const mongoose = require("mongoose")
let Test = new mongoose.Schema({
    descrption: {
        type: String,
    },
    customer: {
        type: String,
    },
    city: {
        type: String
    }
})

module.exports = mongoose.model("testimonials", Test)