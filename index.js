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
const authUser = require("./api/auth")
const activity = require("./api/activity")
const blog = require("./api/blog")
const gallery = require("./api/gallery")
const home = require("./api/home")
const testimonials = require("./api/testimonials")
const query = require("./api/query")

//use middlewaers 
//connect to mongodb
mongoose.set('strictQuery', true);
mongoose.connect(connection).then((res) => {

}).catch((err) => {

})

app.get("/", (req, res) => {
    res.status(200).send("hello user")
})

//add the routers
app.use('/auth', authUser)
app.use('/activity', activity)
app.use('/blog', blog)
app.use('/gallery', gallery)
app.use('/home', home)
app.use('/testimonials', testimonials)
app.use('/query', query)

app.listen(port, () => {
    console.log("app listening on port " + port)
})

