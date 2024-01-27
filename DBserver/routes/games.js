var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const path = require('path');
router.use( bodyParser.json() );
const games_controller = require('../controllers/games_controller.js')

router.get('/all-games', async function(req, res, next) {
    try {
        const games = await games_controller.getAllGames();
        res.json(games);
    } catch (error) {
        console.error('Error retrieving games:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;


router.get('/get-game-events-by-id/:game_id', async function(req, res, next) {
    const game_id = req.params.game_id;

    try {
        const team = await games_controller.getGameEventById(game_id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    } catch (error) {
        console.error('Error retrieving team:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;


router.get('/get-game-by-id/:game_id', async function(req, res, next) {
    const game_id = req.params.game_id;

    try {
        const team = await games_controller.getGameByID(game_id);
        if (!team) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.json(team);
    } catch (error) {
        console.error('Error retrieving Game:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get-club-games-by-id/:clubId', async function(req, res, next) {
    const clubId = req.params.clubId;

    try {
        const team = await games_controller.getClubGameByID(clubId);
        if (!team) {
            return res.status(404).json({ error: 'Games not found' });
        }
        res.json(team);
    } catch (error) {
        console.error('Error retrieving Game:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

