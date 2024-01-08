const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");
const {log} = require("debug");


router.get('/', function(req, res) {
    const teamsFilePath = path.join(__dirname, '../public/single_team.html');
    res.sendFile(teamsFilePath);
});

module.exports = router;

router.get('/get-team-by-id/:clubId', function(req, res) {
    const teamCode = req.params.clubId;
    console.log("++++++ AOOOOOOOOO ")

    axios.get(`http://localhost:8081/get-team-by-id/${teamCode}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;

router.get('/get-players-by-team-id/:teamCode', function(req, res) {
    // GET request to /players/all-player
    const teamCode = req.params.teamCode;

    axios.get(`http://localhost:3000/get-players-by-team-id/${teamCode}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;