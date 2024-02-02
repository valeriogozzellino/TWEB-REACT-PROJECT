var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const path = require('path');
router.use( bodyParser.json() );
const appearances_controller = require('../controllers/appearances_controller.js')

/**
 * Route to get player appearances by player ID.
 *
 * @route GET /get-player-appearances-by-player-id/:player_id
 * @param {string} player_id - The ID of the player.
 * @returns {Object[]} players - Returns a JSON array of player appearances.
 * @returns {Object} error - Returns an error object in case of failure.
 */
router.get('/get-player-appearances-by-player-id/:player_id', async function(req, res, next) {
    const player_id = req.params.player_id;
    try {
        const players = await appearances_controller.getAllPlayerAppearances(player_id);
        res.json(players);
    } catch (error) {
        console.error('Error retrieving players appearances:', error.message);
        res.status(500).json({ error: 'Internal Server Error appearances' });
    }
});

/**
 * Route to get player appearances by game ID.
 *
 * @route GET /get-player-appearances-by-game-id/:game_id
 * @param {string} game_id - The ID of the game.
 * @returns {Object[]} games - Returns a JSON array of player appearances for the specified game.
 * @returns {Object} error - Returns an error object in case of failure.
 */
router.get('/get-player-appearances-by-game-id/:game_id', async function(req, res, next) {
    const game_id = req.params.game_id;
    try {
        const games = await appearances_controller.getAllPlayerAppearancesByGameId(game_id);
        res.json(games);
    } catch (error) {
        console.error('Error retrieving players appearances: BY GAME D', error.message);
        res.status(500).json({ error: 'Internal Server Error appearances BY GAME ID' });
    }
});

module.exports = router;