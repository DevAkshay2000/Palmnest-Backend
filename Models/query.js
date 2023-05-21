// Schema for gallery images
const mongoose = require("mongoose")
const querySchema = new mongoose.Schema({
    email: String,
    name: String,
    mobile: String,
    message: String,

})

module.exports = mongoose.model("querySchema", querySchema)