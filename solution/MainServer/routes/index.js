const express = require('express');
const router = express.Router();
const axios = require('axios')
const path = require("path");


const apiKey = "62563bbc4e9e5b4871a03be615443210";
const apiUrl = "https://gnews.io/api/v4/search?country=it&category=sport&q=football&apikey=" + apiKey;




router.get("/get-news", function(req, res) {
        axios.get(apiUrl)
            .then(response => {
                res.json(response.data)
            })
            .catch(error => {
                res.setHeader('Content-Type', 'application/json');
                res.status(500).json({ error: 'Internal Server Error' });
            });
    })

module.exports = router;