const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


router.get('/', function(req, res) {
    const playerFilePath = path.join(__dirname, '../public/player.html');
    res.sendFile(playerFilePath);
});

//per ora questa funzione mi restituisce tutti i players
//router.get('/get-player-by-id/:playerId', function(req, res) {
router.get('/get-player-by-team', function(req, res) {
    console.log("ho ricevuto la richiesta dei players")
    const { filter } = req.query;
    console.log("sono nella get, filter: "+ filter);
    axios.get(`http://localhost:8081/get-player-by-team?filter=${filter}`)
        .then(response => {
            console.log("ho richiesto players");
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
router.get('/get-player-by-playerId', function(req, res) {
    console.log("ho ricevuto la richiesta dei players")
    const { filter } = req.query;
    console.log("sono nella get, filter: "+ filter);
    axios.get(`http://localhost:8081/get-player-by-playerId?filter=${filter}`)
        .then(response => {
            console.log("ho richiesto players");
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;


router.get('/get-player-appearances-by-player-id/:player_id', function(req, res) {
    console.log("ho ricevuto la richiesta dei players APPEARANCES")
    const player_id = req.params.player_id;
    const { filter } = req.query;
    axios.get(`http://localhost:3000/get-player-appearances-by-player-id/${player_id}`)
        .then(response => {
            console.log("ho richiesto players appearances");
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;

router.get('/get-player-appearances-by-game-id/:game_id', function(req, res) {
    console.log("ho ricevuto la richiesta dei players APPEARANCES")
    const game_id = req.params.game_id;

    axios.get(`http://localhost:3000/get-player-appearances-by-game-id/${game_id}`)
        .then(response => {
            console.log("ho richiesto players appearances CON GAME ID");
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error APPEARANCES BY ID' });
        });
})
module.exports = router;