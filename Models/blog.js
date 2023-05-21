const mongoose = require("mongoose")
let blog = new mongoose.Schema({
    //basic registraion details
    title: {
        type: String,

    },
    description: {
        type: String,

    },
    author: {
        type: String,

    },
    image: String

})

module.exports = mongoose.model("blog", blog)