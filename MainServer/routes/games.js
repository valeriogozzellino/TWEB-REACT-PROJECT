const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");



router.get('/get-games', function(req, res) {
    // GET request to /players/all-player
    axios.get('http://localhost:3000/games/all-games')
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;


router.get('/get-club-games-by-id/:clubId', function(req, res) {
    const clubId = req.params.clubId;

    axios.get(`http://localhost:3000/games/get-club-games-by-id/${clubId}`)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error("Error in Axios request:", error.message);
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;