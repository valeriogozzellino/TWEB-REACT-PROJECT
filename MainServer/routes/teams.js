const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


router.get('/', function(req, res) {
    const teamsFilePath = path.join(__dirname, '../public/teams.html');
    res.sendFile(teamsFilePath);
});

//richiesta di dati al server passando come parametri un filtro sulla competitions!!!!!
router.get('/get-teams-by-competition', function (req, res) {
    console.log("ho ricevuto la richiesta dei teams")
    const { filterCompetition } = req.query;
    console.log("parametrooooo " + filterCompetition)
    axios.get(`http://localhost:8081/get-teams-by-competition?filterCompetition=${filterCompetition}`)
        .then(response => {
            console.log("Sto richiedendo i teams");
            res.json(response.data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
router.get('/get-teams-country', function(req, res) {
    axios.get(`http://localhost:8081/get-teams-country`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
router.get('/get-competitions-id', function(req, res) {
    axios.get(`http://localhost:8081/get-competitions-id`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;