const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");

router.get('/get-game-events-by-id/:game_id', function(req, res) {
    // GET request to /players/all-player
    const game_id = req.params.game_id;

    axios.get(`http://localhost:3000/games/get-game-events-by-id/${game_id}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;


router.get('/get-game-by-id/:game_id', function(req, res) {
    // GET request to /players/all-player
    const game_id = req.params.game_id;

    axios.get(`http://localhost:3000/games/get-game-by-id/${game_id}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;