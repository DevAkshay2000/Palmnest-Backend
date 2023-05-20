// Schema for OTP
const mongoose = require("mongoose")
let Blog = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: Date,
    },
    author: {
        type: Date
    }
})

module.exports = mongoose.model("blogs", Blog)