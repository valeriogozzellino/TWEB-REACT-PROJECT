const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


router.get('/', function(req, res) {
    const teamsFilePath = path.join(__dirname, '../public/ranking.html');
    res.sendFile(teamsFilePath);
});

module.exports = router;
router.get('/get-teams', function(req, res) {
    // GET request to /players/all-player

    axios.get('http://localhost:3000/all-teams')
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Internal Server Error' });
        });
})

module.exports = router;

