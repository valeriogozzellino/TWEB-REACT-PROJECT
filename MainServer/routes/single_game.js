const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


/**
 * GET events of a specific game by game ID.
 *
 * @route GET /get-game-events-by-id/:game_id
 * @param {number} game_id - The ID of the game.
 * @returns {JSON} An array of event objects for the specified game ID.
 */
router.get('/get-game-events-by-id/:game_id', function (req, res) {
    const game_id = req.params.game_id;

    axios.get(`http://localhost:3000/games/get-game-events-by-id/${game_id}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({error: 'Internal Server Error'});
        });
})
module.exports = router;

/**
 * GET details of a specific game by game ID.
 *
 * @route GET /get-game-by-id/:game_id
 * @param {number} game_id - The ID of the game.
 * @returns {JSON} Game object details for the specified game ID.
 */

router.get('/get-game-by-id/:game_id', function (req, res) {
    const game_id = req.params.game_id;

    axios.get(`http://localhost:3000/games/get-game-by-id/${game_id}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({error: 'Internal Server Error'});
        });
})
module.exports = router;