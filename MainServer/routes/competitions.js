const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


// router.get('/', function(req, res) {
//     const competitionsFilePath = path.join(__dirname, '../public/player.html');
//     res.sendFile(competitionsFilePath);
// });


router.get('/all-competitions', function(req, res) {
    console.log("sono nella get");
    const { filter } = req.query;
    console.log("sono nella get, filter: "+ filter);

    axios.get(`http://localhost:8081/all-competitions?filter=${filter}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})

router.get('/get-competitions-by-id', function(req, res) {
    console.log("sono nella get");
    const { competitionId } = req.query;
    console.log("sono nella get, filter: "+ competitionId);

    axios.get(`http://localhost:8081/get-competitions-by-id?competitionId=${competitionId}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})

router.get('/get-competitions-country', function(req, res) {
    axios.get(`http://localhost:8081/get-competitions-country`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})

module.exports = router;