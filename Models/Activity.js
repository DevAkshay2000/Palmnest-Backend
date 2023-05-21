const mongoose = require("mongoose");
let activity = new mongoose.Schema({
    //basic registraion details
    title: {
        type: String,

    },
    image: {
        type: Object,

    },

})

module.exports = mongoose.model("activity", activity)