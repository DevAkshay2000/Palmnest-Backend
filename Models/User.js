const mongoose = require("mongoose")
let usermodel = new mongoose.Schema({
    //basic registraion details
    email: {
        type: String,
        unique: true,
        require: [true, "why no email"],

    },
    password: {
        type: String,
        
        require: [true, "why no number"]
    },
  
})

module.exports = mongoose.model("user", usermodel)