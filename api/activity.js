// // @ts-nocheck
// const express = require("express")
// const router = express.Router();
// const Activity = require("../Models/activity")
// const cheackUser = require("../Middlewears/Authorizations")
// var cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.api_key,
//     api_secret: process.env.api_secret,
//     secure: true
// });

// //Add
// router.post("/activities", cheackUser, async (req, res) => {
//     const { title, image } = req.body;
//     try {
//         const file1 = await cloudinary.uploader.upload(image);
//         const newImage = Activity({
//             title: title,
//             image: {
//                 public_id: file1.public_id,
//                 url: file1.url
//             }
//         })
//         newImage.save().then((val) => {
//             res.status(200).send(val)
//         }).catch((err) => {
//             res.status(400).send(err)
//         })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(400).send("sorry error occured..")
//     }
// })

// //read public api
// router.get('/getactivity', (req, res) => {
//     Activity.find().then((val) => {
//         res.status(200).send(val)
//     }).catch((err) => {
//         res.status(404).send(err)
//     })
// })

// //delete 
// router.post('/deleteactivityimage', cheackUser, (req, response) => {
//     const { id } = req.body;
//     Activity.findById(id).then((val) => {
//         cloudinary.uploader
//             .destroy(val.image.public_id)
//             .then((result) => {
//                 Activity.findByIdAndDelete(id, (err, docs) => {
//                     if (err) {
//                         response.status(400).send("Error in document deletion..")
//                     }
//                     else {
//                         response.status(200).send("Opertaion sucsessfully..")
//                     }
//                 })
//             })
//             .catch((error) => {
//                 response.status(400).send({
//                     message: "Failure",
//                     error,
//                 });
//             });
//     }).catch((err) => {
//         response.status(400).send(err)
//     })
// })

// module.exports = router