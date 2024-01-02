const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


// router.get('/', function(req, res) {
//     const competitionsFilePath = path.join(__dirname, '../public/player.html');
//     res.sendFile(competitionsFilePath);
// });

//per ora questa funzione mi restituisce tutti i players
//router.get('/get-player-by-id/:playerId', function(req, res) {
router.get('/all-competitions', function(req, res) {
    console.log("sono nella get");
    const { filter } = req.query;
    console.log("sono nella get, filter: "+ filter);

    axios.get(`http://localhost:8081/all-competitions?filter=${filter}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
router.get('/get-competitions-country', function(req, res) {
    axios.get(`http://localhost:8081/get-competitions-country`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})

module.exports = router;