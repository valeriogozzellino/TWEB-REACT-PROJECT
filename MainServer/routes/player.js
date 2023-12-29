const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


router.get('/', function(req, res) {
    const teamsFilePath = path.join(__dirname, '../public/player.html');
    res.sendFile(teamsFilePath);
});

//per ora questa funzione mi restituisce tutti i players
//router.get('/get-player-by-id/:playerId', function(req, res) {
router.get('/get-player-by-id', function(req, res) {
    // GET request to /players/all-player
    //const playerId = req.params.playerId;
    console.log("sono nella get");
    //axios.get(`http://localhost:3000/get-player-by-id/${playerId}`)
    axios.get(`http://localhost:8081/all-players`)
        .then(response => {
            console.log("ho richiesto nel modo corretto i dati");
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;