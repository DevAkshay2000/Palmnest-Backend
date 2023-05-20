// Schema for Gallery
const mongoose = require("mongoose")
let User = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    }
})

module.exports = mongoose.model("user", User)