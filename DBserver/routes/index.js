var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use( bodyParser.json() );
const players_controller = require('../controllers/player_controller.js')
const teams_controller = require('../controllers/teams_controller.js')
const games_controller = require('../controllers/games_controller.js')



module.exports = router;

/* todo ++++++++ PLAYERS ++++++++ */
router.get('/all-player', async function(req, res, next) {
  try {
    const players = await players_controller.getAllPlayers();
    res.json(players);
  } catch (error) {
    console.error('Error retrieving players:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


router.get('/get-player-appearances-by-player-id/:player_id', async function(req, res, next) {
  const player_id = req.params.player_id;
  try {
    const players = await players_controller.getAllPlayerAppearances(player_id);
    res.json(players);
  } catch (error) {
    console.error('Error retrieving players appearances:', error.message);
    res.status(500).json({ error: 'Internal Server Error appearances' });
  }
});

module.exports = router;

router.get('/get-player-appearances-by-game-id/:game_id', async function(req, res, next) {
  const game_id = req.params.game_id;
  try {
    const games = await players_controller.getAllPlayerAppearancesByGameId(game_id);
    res.json(games);
  } catch (error) {
    console.error('Error retrieving players appearances: BY GAME D', error.message);
    res.status(500).json({ error: 'Internal Server Error appearances BY GAME ID' });
  }
});

module.exports = router;


/* todo ++++++++ TEAMS ++++++++ */
router.get('/all-teams', async function(req, res, next) {
  try {
    const teams = await teams_controller.getAllTeams();
    res.json(teams);
  } catch (error) {
    console.error('Error retrieving teams:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/get-team-by-id/:team_id', async function(req, res, next) {
  const teamId = req.params.team_id;

  try {
    const team = await teams_controller.getTeamById(teamId);
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


router.get('/get-player-by-id/:player_id', async function(req, res, next) {
  const player_id = req.params.player_id;

  try {
    const team = await teams_controller.getPlayerById(player_id);
    if (!team) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(team);
  } catch (error) {
    console.error('Error retrieving player:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

router.get('/get-players-by-team-id/:team_id', async function(req, res, next) {
  const teamId = req.params.team_id;

  try {
    const team = await teams_controller.getPlayerByTeamId(teamId);
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


/* todo ++++++++ GAMES ++++++++ */

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


module.exports = router;

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
