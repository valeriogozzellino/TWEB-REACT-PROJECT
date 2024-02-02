const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");



/**
 * GET a list of teams participating in a specific competition.
 *
 * @route GET /get-teams-by-competition
 * @param {string} filterCompetition - Query param to filter teams by competition.
 * @returns {JSON} An array of team objects participating in the specified competition.
 */
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

/**
 * GET a list of teams based on season and country.
 *
 * @route GET /get-teams-by-season-and-country
 * @param {string} filterCountry - Query param to filter teams by country.
 * @param {string} filterSeason - Query param to filter teams by season.
 * @returns {JSON} An array of team objects filtered by country and season.
 */
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
/**
 * GET a list of teams categorized by country.
 *
 * @route GET /get-teams-country
 * @returns {JSON} An array of team objects categorized by country.
 */
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
/**
 * GET a list of club seasons.
 *
 * @route GET /get-club-season
 * @returns {JSON} An array of club season objects.
 */
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