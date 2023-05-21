const express = require("express")
const router = express.Router();

const getAccesstoken = require('../Functions/getAccesstoken')
const UserModel = require('../Models/user')
require('dotenv').config();
//router login a user
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    //find the user with email in database
    UserModel.findOne({ email, password }).then(async (val1) => {
        if (val1) {
            res.status(200).send({ accesstoken: await getAccesstoken(val1.email) })
        }
        else {
            res.status(401).send("Sorry user not found with given email id")
        }
    }).catch(() => {
        res.status(400).send("sorry errro in mongodb")
    })

})

// router.post('/createuser', (req, res) => {
//     const { email, password } = req.body;
//     //find the user with email in database
//     UserModel.create({ email, password }).then(async (val1) => {
//         if (val1) {
//             res.status(200).send("Ok")
//         }
//         else {
//             res.status(401).send("Not created")
//         }
//     }).catch((err) => {
//         console.log(err);
//         res.status(400).send("sorry error in mongodb")
//     })

// })
module.exports = router