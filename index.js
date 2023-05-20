// @ts-nocheck 
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const app = express()
const port = 3030 || process.env.port
const connection = `mongodb+srv://reshimgath:${process.env.mongopassword}@cluster0.8qothpm.mongodb.net/reshimgath?retryWrites=true&w=majority`

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
//connect to mongodb
mongoose.set('strictQuery', true);
mongoose.connect(connection).then((res) => {
    console.log(res)
}).catch((err) => {

})

app.get("/", (req, res) => {
    res.status(200).send("hello user")
})


app.listen(port, () => {
    console.log("app listening on port " + port)
})