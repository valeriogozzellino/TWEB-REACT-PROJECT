const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


router.get('/', function(req, res) {
    const teamsFilePath = path.join(__dirname, '../public/teams.html');
    res.sendFile(teamsFilePath);
});

/*request Teams using Competitions filter */
// router.get('/get-teams-by-competition', function (req, res) {
//     console.log("ho ricevuto la richiesta dei teams")
//     const { filterCompetition } = req.query;
//     console.log("parametrooooo " + filterCompetition)
//     axios.get(`http://localhost:8081/get-teams-by-competition?filterCompetition=${filterCompetition}`)
//         .then(response => {
//             console.log("Sto richiedendo i teams");
//             res.json(response.data);
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// });
/*request Teams using Country filter and Competition filter */
router.get('/get-teams-by-season-and-country', function (req, res) {
    console.log("Ho ricevuto la richiesta dei teams");

    const { filterCountry, filterSeason } = req.query;
    console.log("Parametro 1: " + filterCountry);
    console.log("Parametro 2: " + filterSeason);

    axios.get(`http://localhost:8081/get-teams-by-season-and-country?filterCountry=${filterCountry}&filterSeason=${filterSeason}`)
        .then(response => {
            console.log("Sto richiedendo i teams");
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
            console.log("richiesto le season")
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;