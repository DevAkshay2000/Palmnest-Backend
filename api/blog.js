const express = require("express")
const router = express.Router();
const Blog = require("../Models/blog")
const cheackUser = require("../Middlewears/Authorizations");
const { Query } = require("mongoose");
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});

//create 
router.post("/blogs",cheackUser, (req, res) => {
    const { title, description, author, image } = req.body;
    const blog = new Blog({
        title, description, author, image
    })
    blog.save().then(() => {
        res.status(200).send("blog added")
    }).catch((err) => {
        res.status(400).send("errror")
    })

})
//read
router.get("/blogs", async (req, res) => {

    try {
        const data = await Blog.find({})
        res.status(200).send(data)

    }
    catch (e) {
        res.status(400).send("errror")
    }
})
//update
router.post("/blogsupdate",cheackUser, async (req, res) => {
    const { id, title, description, author, image } = req.body;
    let responseCloud1
    image.split(":")[0] === 'data' ? responseCloud1 = await cloudinary.uploader.upload(image) : (responseCloud1 = image)
    Blog.findByIdAndUpdate(id, {
        id, title, description, author, image
    }).then(() => {
        res.status(200).send("updated")
    }).catch((err) => {
        res.status(400).send("error")
    })
})
//delete 
router.delete("/blogs",cheackUser, (req, res) => {
    const id = req.query.id;
    console.log(id)
    Blog.findByIdAndDelete(id).then(() => {
        res.status(200).send("deleted")
    }).catch((err)=>{
        res.status(400).send("error")
    })
})

module.exports = router;