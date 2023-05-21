// @ts-nocheck
const { response } = require("express");
const express = require("express");
const Query = require("../Models/query");
const router = express.Router();

const cheackUser = require("../Middlewears/Authorizations")

router.post("/userquery", (req, res) => {
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

router.get("/userquery",cheackUser, async (req, res) => {
    try {
        const data = await Query.find({});
        res.status(200).send(data)
    }
    catch (e) {
        res.status(400).send("error")

    }
})

module.exports = router