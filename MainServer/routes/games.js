const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");



router.get('/get-games', function(req, res) {
    // GET request to /players/all-player
    console.log("+++GET GAMES")
    axios.get('http://localhost:3000/all-games')
        .then(response => {
            console.log("++++ THEN GET GAMES")
            res.json(response.data)
        })
        .catch(error => {
            console.log("++++ CATCH GET GAMES")
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;


// todo : Game_Events
router.get('/get-game-events', function(req, res) {
    // GET request to /players/all-player
    console.log("+++GET GAMES")
    axios.get('http://localhost:3000/games-events/:game_id')
        .then(response => {
            console.log("++++ THEN GET GAMES")
            res.json(response.data)
        })
        .catch(error => {
            console.log("++++ CATCH GET GAMES")
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;