// @ts-nocheck
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const app = express()
const port = 3031 || process.env.port
// const connection = `mongodb+srv://Muchmark:${process.env.mongopassword}@cluster0.irij3nk.mongodb.net/reshimgath?retryWrites=true&w=majority`
const connection = `mongodb+srv://theplamnestfarm:${process.env.mongopassword}@cluster0.ewqiatk.mongodb.net/palmnestfarm?retryWrites=true&w=majority`
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }));
//import routers
//use middlewaers 
//connect to mongodb
mongoose.set('strictQuery', true);
mongoose.connect(connection).then((res) => {
}).catch((err) => {
})

app.get("/", (req, res) => {
    res.status(200).send("hello user")
})
// route starts here for avtivity
// @ts-nocheck

const Activity = require("./Models/Activity")
const cheackUser = require("./Middlewears/Authorizations")
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});

//Add
app.post("/activity/activities", cheackUser, async (req, res) => {
    const { title, image } = req.body;
    try {
        const file1 = await cloudinary.uploader.upload(image);
        const newImage = Activity({
            title: title,
            image: {
                public_id: file1.public_id,
                url: file1.url
            }
        })
        newImage.save().then((val) => {
            res.status(200).send(val)
        }).catch((err) => {
            res.status(400).send(err)
        })
    }
    catch (err) {
        console.log(err)
        res.status(400).send("sorry error occured..")
    }
})

//read public api
app.get('/activity/getactivity', (req, res) => {
    Activity.find().then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(404).send(err)
    })
})

//delete 
app.post('/activity/deleteactivityimage', cheackUser, (req, response) => {
    const { id } = req.body;
    Activity.findById(id).then((val) => {
        cloudinary.uploader
            .destroy(val.image.public_id)
            .then((result) => {
                Activity.findByIdAndDelete(id, (err, docs) => {
                    if (err) {
                        response.status(400).send("Error in document deletion..")
                    }
                    else {
                        response.status(200).send("Opertaion sucsessfully..")
                    }
                })
            })
            .catch((error) => {
                response.status(400).send({
                    message: "Failure",
                    error,
                });
            });
    }).catch((err) => {
        response.status(400).send(err)
    })
})

// api for auth starts here
const UserModel = require('./Models/User')
app.post('/auth/login', (req, res) => {
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

// app.post('/createuser', (req, res) => {
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

// apiu for blogs starts here
const Blog = require("./Models/blog")
//create 
app.post("/blog/blogs", cheackUser, async (req, res) => {
    const { title, description, author, image } = req.body;
    const file1 = await cloudinary.uploader.upload(image);
    const blog = new Blog({
        title, description, author,
        image: {
            public_id: file1.public_id,
            url: file1.url

        }
    })
    blog.save().then(() => {
        res.status(200).send("blog added")
    }).catch((err) => {
        console.log(err)
        res.status(400).send("errror")
    })

})
//read
app.get("/blog/blogs", async (req, res) => {

    try {
        const data = await Blog.find({})
        res.status(200).send(data)

    }
    catch (e) {
        res.status(400).send("errror")
    }
})
app.get("/blog/blogbyid", cheackUser, async (req, res) => {
    const id = req.query.id;
    try {
        const data = await Blog.findById(id)
        res.status(200).send(data)
    }
    catch (e) {
        res.status(400).send("error")
    }
})

//update
app.post("/blog/blogsupdate", cheackUser, async (req, res) => {
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
app.delete("/blog/blogs", cheackUser, (req, res) => {
    const id = req.query.id;
    Blog.findByIdAndDelete(id).then(() => {
        res.status(200).send("deleted")
    }).catch((err) => {
        res.status(400).send("error")
    })
})
// api for gallery
const Gallery = require("./Models/Gallery");
app.post("/gallery/addgalleryimage", cheackUser, async (req, res) => {
    const { eventName, myfile } = req.body;
    try {
        const file1 = await cloudinary.uploader.upload(myfile);
        const newImage = Gallery({
            eventName,
            image: {
                public_id: file1.public_id,
                url: file1.url
            }
        })
        newImage.save().then((val) => {
            res.status(200).send(val)
        }).catch((err) => {
            res.status(400).send(err)
        })
    }
    catch {
        res.status(400).send("sorry error occured..")
    }
})


//read public api
app.get('/gallery/getgallery', (req, res) => {
    Gallery.find().then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(404).send(err)
    })
})

//delete 
app.post('/gallery/deletegalleryimage', cheackUser, (req, response) => {
    const { id } = req.body;
    Gallery.findById(id).then((val) => {
        cloudinary.uploader
            .destroy(val.image.public_id)
            .then((result) => {
                Gallery.findByIdAndDelete(id, (err, docs) => {
                    if (err) {
                        response.status(400).send("Error in document deletion..")
                    }
                    else {
                        response.status(200).send("Opertaion sucsessfully..")
                    }
                })
            })
            .catch((error) => {
                response.status(400).send({
                    message: "Failure",
                    error,
                });
            });
    }).catch((err) => {
        response.status(400).send(err)
    })
})

// api for home carousel starts here
const Home = require("./Models/Home");
//addgallery image private api
app.post("/home/addhomecarousel", cheackUser, async (req, res) => {
    const { title, image } = req.body;
    try {
        const file1 = await cloudinary.uploader.upload(image);
        const newImage = Home({
            title: title,
            image: {
                public_id: file1.public_id,
                url: file1.url
            }
        })
        newImage.save().then((val) => {
            res.status(200).send(val)
        }).catch((err) => {
            res.status(400).send(err)
        })
    }
    catch {
        res.status(400).send("sorry error occured..")
    }
})

//read public api
app.get('/home/gethomecarousel', (req, res) => {
    Home.find().then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(404).send(err)
    })
})

//delete 
app.post('/home/deletehomecarousel', cheackUser, (req, response) => {
    const { id } = req.body;
    Home.findById(id).then((val) => {
        cloudinary.uploader
            .destroy(val.image.public_id)
            .then((result) => {
                Home.findByIdAndDelete(id, (err, docs) => {
                    if (err) {
                        response.status(400).send("Error in document deletion..")
                    }
                    else {
                        response.status(200).send("Opertaion sucsessfully..")
                    }
                })
            })
            .catch((error) => {
                response.status(400).send({
                    message: "Failure",
                    error,
                });
            });
    }).catch((err) => {
        response.status(400).send(err)
    })
})

// user queries starTS herE
const Query = require("./Models/query");
app.post("/query/userquery", (req, res) => {
    const { email, name, mobile, message } = req.body;
    const query = new Query({
        email, name, mobile, message
    })
    query.save().then(() => {
        res.status(200).send("query sent succesfully...")
    }).catch((err) => [
        res.status(400).send("errro")
    ])
})

app.get("/query/userquery", cheackUser, async (req, res) => {
    try {
        const data = await Query.find({});
        res.status(200).send(data)
    }
    catch (e) {
        res.status(400).send("error")

    }
})
// testimonials start shere
const testimonials = require("./Models/Testimonials");
//add blog
app.post("/testimonials/addtestimonials", cheackUser, async (req, res) => {
    const { dscription, author, city } = req.body;
    try {
        const newImage = testimonials({

            dscription,
            author,
            city
        })
        newImage.save().then((val) => {
            res.status(200).send(val)
        }).catch((err) => {
            res.status(400).send(err)
        })
    }
    catch {
        res.status(400).send("sorry error occured..")
    }
})

//read public api
app.get('/testimonials/gettestimonials', (req, res) => {
    testimonials.find().then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        res.status(404).send(err)
    })
})

//delete 
app.post('/testimonials/deletetestimonials', cheackUser, (req, response) => {
    const { id } = req.body;
    testimonials.findByIdAndDelete(id, (err, docs) => {
        if (err) {
            response.status(400).send("Error in document deletion..")
        }
        else {
            response.status(200).send("Opertaion sucsessfully..")
        }
    })

})

app.listen(port, () => {
    console.log("app listening on port " + port)
})

