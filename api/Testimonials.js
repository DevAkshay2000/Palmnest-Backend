// // @ts-nocheck
// const express = require("express")
// const router = express.Router();
// const cheackUser = require("../Middlewears/Authorizations")
// const testimonials = require("../Models/testimonials");

// //add blog
// router.post("/addtestimonials", cheackUser, async (req, res) => {
//     const { dscription, author, city} = req.body;
//     try {
//         const newImage = testimonials({
             
//             dscription, 
//             author, 
//             city
//         })
//         newImage.save().then((val) => {
//             res.status(200).send(val)
//         }).catch((err) => {
//             res.status(400).send(err)
//         })
//     }
//     catch {
//         res.status(400).send("sorry error occured..")
//     }
// })

// //read public api
// router.get('/gettestimonials', (req, res) => {
//     testimonials.find().then((val) => {
//         res.status(200).send(val)
//     }).catch((err) => {
//         res.status(404).send(err)
//     })
// })

// //delete 
// router.post('/deletetestimonials', cheackUser, (req, response) => {
//     const { id } = req.body;
//     testimonials.findByIdAndDelete(id, (err, docs) => {
//         if (err) {
//             response.status(400).send("Error in document deletion..")
//         }
//         else {
//             response.status(200).send("Opertaion sucsessfully..")
//         }
//     })
        
// })

// //update


// module.exports=router