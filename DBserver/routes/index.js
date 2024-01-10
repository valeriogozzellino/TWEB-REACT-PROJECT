var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use( bodyParser.json() );
const Player = require('../models/player_model');
const players_controller = require('../controllers/player_controller.js')
const teams_controller = require('../controllers/teams_controller.js')
const games_controller = require('../controllers/games_controller.js')


// TODO: Rendere questo file un controller generale dell'applicazione che reindirizza a /teams, /players, etc..
//       aggiungere controller specifici con i metodi per tutti i tipi diversi di richieste (getTeamById in /teams, getPlayersById in /players etc..)
router.get('/all-teams', async function(req, res, next) {
  console.log("RICEVUTO RICHIESTA TEAMS")
  try {
    const teams = await teams_controller.getAllTeams();
    res.json(teams);
  } catch (error) {
    console.error('Error retrieving teams:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

// GET /players
router.get('/all-player', async function(req, res, next) {
  console.log("RICEVUTO RICHIESTA PLAYERS")
  try {
    const players = await players_controller.getAllPlayers();
    res.json(players);
  } catch (error) {
    console.error('Error retrieving players:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


router.get('/get-team-by-id/:team_id', async function(req, res, next) {
  const teamId = req.params.team_id;
  console.log("RICEVUTO RICHIESTA SINGLE TEAM CON ID:", teamId);

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
  console.log("++++++++++++RICEVUTO RICHIESTA Giocatore Singolo del:", player_id);

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
  console.log("++++++++++++RICEVUTO RICHIESTA Giocatori con Team id:", teamId);

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


router.get('/all-games', async function(req, res, next) {
  console.log("RICEVUTO RICHIESTA GAMES")
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
  console.log("++++++++++++RICEVUTO RICHIESTA GAME EVENTS con id:", game_id);

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
  console.log("++++++++++++RICEVUTO RICHIESTA GAME SINGOLO con id:", game_id);

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
  console.log("++++++++++++RICEVUTO RICHIESTA GAMES QUADRA con id:", clubId);

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
