const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


router.get('/', function(req, res) {
    const teamsFilePath = path.join(__dirname, '../public/teams.html');
    res.sendFile(teamsFilePath);
});

//richiesta di dati al server passando come parametri un filtro!!!!!
router.get('/all-teams', function (req, res) {
    console.log("ho ricevuto la richiesta dei teams")
    const { filter } = req.query;
    console.log("parametrooooo "+ filter)
    axios.get(`http://localhost:8081/all-teams?filter=${filter}`)
        .then(response => {
            console.log("Sto richiedendo i teams");
            res.json(response.data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
module.exports = router;