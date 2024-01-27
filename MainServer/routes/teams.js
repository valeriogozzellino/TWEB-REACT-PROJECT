const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


router.get('/', function(req, res) {
    const teamsFilePath = path.join(__dirname, '../public/teams.html');
    res.sendFile(teamsFilePath);
});

// /*request Teams using Competitions filter */
router.get('/get-teams-by-competition', function (req, res) {
    const { filterCompetition } = req.query;
    axios.get(`http://localhost:8081/get-teams-by-competition?filterCompetition=${filterCompetition}`)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
/*request Teams using Country filter and Competition filter */
router.get('/get-teams-by-season-and-country', function (req, res) {

    const { filterCountry, filterSeason } = req.query;

    axios.get(`http://localhost:8081/get-teams-by-season-and-country?filterCountry=${filterCountry}&filterSeason=${filterSeason}`)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
/*request ALL Teams country  */
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
/*request ALL Teams Season */
router.get('/get-club-season', function(req, res) {
    axios.get(`http://localhost:8081/get-club-season`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;