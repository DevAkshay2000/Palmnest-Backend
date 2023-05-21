const mongoose = require("mongoose");
let home = new mongoose.Schema({
    //basic registraion details
    title: {
        type: String,

    },
    image: {
        type: Object,

    },

})

module.exports = mongoose.model("home", home)