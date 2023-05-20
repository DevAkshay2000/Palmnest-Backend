// Schema for OTP
const mongoose = require("mongoose")
let Activity = new mongoose.Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    }
})

module.exports = mongoose.model("activity", Activity)