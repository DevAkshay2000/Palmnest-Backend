

const mongoose = require("mongoose");
let testimonials = new mongoose.Schema({
    //basic registraion details
    title: {
        type: String,
    },
    author: {
        type: String,

    },
    description: {
        type: String,

    },
    city: {
        type: String,
    }

})

module.exports = mongoose.model("testimonials", testimonials)