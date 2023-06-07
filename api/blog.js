// const express = require("express")
// const router = express.Router();
// const Blog = require("../Models/blog")
// const cheackUser = require("../Middlewears/Authorizations");
// var cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.api_key,
//     api_secret: process.env.api_secret,
//     secure: true
// });

// //create 
// router.post("/blogs", cheackUser, async (req, res) => {
//     const { title, description, author, image } = req.body;
//     const file1 = await cloudinary.uploader.upload(image);
//     const blog = new Blog({
//         title, description, author,
//         image: {
//             public_id: file1.public_id,
//             url: file1.url

//         }
//     })
//     blog.save().then(() => {
//         res.status(200).send("blog added")
//     }).catch((err) => {
//         console.log(err)
//         res.status(400).send("errror")
//     })

// })
// //read
// router.get("/blogs", async (req, res) => {

//     try {
//         const data = await Blog.find({})
//         res.status(200).send(data)

//     }
//     catch (e) {
//         res.status(400).send("errror")
//     }
// })
// router.get("/blogbyid", cheackUser, async (req, res) => {
//     const id = req.query.id;
//     try {
//         const data = await Blog.findById(id)
//         res.status(200).send(data)
//     }
//     catch (e) {
//         res.status(400).send("error")
//     }
// })

// //update
// router.post("/blogsupdate", cheackUser, async (req, res) => {
//     const { id, title, description, author, image } = req.body;
//     let responseCloud1
//     image.split(":")[0] === 'data' ? responseCloud1 = await cloudinary.uploader.upload(image) : (responseCloud1 = image)
//     Blog.findByIdAndUpdate(id, {
//         id, title, description, author, image
//     }).then(() => {
//         res.status(200).send("updated")
//     }).catch((err) => {
//         res.status(400).send("error")
//     })
// })
// //delete 
// router.delete("/blogs", cheackUser, (req, res) => {
//     const id = req.query.id;
//     Blog.findByIdAndDelete(id).then(() => {
//         res.status(200).send("deleted")
//     }).catch((err) => {
//         res.status(400).send("error")
//     })
// })

// module.exports = router;