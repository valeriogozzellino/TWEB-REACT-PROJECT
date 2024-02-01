const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");

/**
 * GET a filtered list of players based on team.
 *
 * @route GET /get-player-by-team
 * @param {string} filter - Query param to filter players by team.
 * @returns {JSON} An array of player objects filtered by team.
 */
router.get('/get-player-by-team', function(req, res) {
    const { filter } = req.query;
    axios.get(`http://localhost:8081/get-player-by-team?filter=${filter}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})


/**
 * GET a list of all players.
 *
 * @route GET /get-all-players
 * @returns {JSON} An array of all player objects.
 */
router.get('/get-all-players', function(req, res) {
    axios.get(`http://localhost:8081/get-all-players`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
/**
 * GET a filtered list of players based on player ID.
 *
 * @route GET /get-player-by-playerId
 * @param {string} filter - Query param to filter players by player ID.
 * @returns {JSON} An array of player objects filtered by player ID.
 */
router.get('/get-player-by-playerId', function(req, res) {
    const { filter } = req.query;
    axios.get(`http://localhost:8081/get-player-by-playerId?filter=${filter}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;

/**
 * GET a list of player appearances filtered by player ID.
 *
 * @route GET /get-player-appearances-by-player-id/:player_id
 * @param {number} player_id - The ID of the player.
 * @returns {JSON} An array of appearance objects for a specific player.
 */
router.get('/get-player-appearances-by-player-id/:player_id', function(req, res) {
    const player_id = req.params.player_id;
    axios.get(`http://localhost:3000/appearances/get-player-appearances-by-player-id/${player_id}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;
/**
 * GET a list of player appearances filtered by game ID.
 *
 * @route GET /get-player-appearances-by-game-id/:game_id
 * @param {number} game_id - The ID of the game.
 * @returns {JSON} An array of appearance objects for a specific game.
 */
router.get('/get-player-appearances-by-game-id/:game_id', function(req, res) {
    const game_id = req.params.game_id;

    axios.get(`http://localhost:3000/appearances/get-player-appearances-by-game-id/${game_id}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error APPEARANCES BY ID' });
        });
})
module.exports = router;