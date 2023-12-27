const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


router.get('/', function(req, res) {
    const teamsFilePath = path.join(__dirname, '../public/single_team.html');
    res.sendFile(teamsFilePath);
});

module.exports = router;
router.get('/get-team-by-id/:teamCode', function(req, res) {
    // GET request to /players/all-player
    const teamCode = req.params.teamCode;

    axios.get(`http://localhost:3000/get-team-by-id/${teamCode}`)
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