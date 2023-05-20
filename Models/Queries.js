// Schema for Gallery
const mongoose = require("mongoose")
let Queries = new mongoose.Schema({
    Name: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String
    },
    mobile: {
        type: String
    }
})

module.exports = mongoose.model("queries", Queries)