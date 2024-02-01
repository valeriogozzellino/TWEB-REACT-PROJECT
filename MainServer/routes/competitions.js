const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


/**
 * GET a filtered list of all competitions.
 *
 * @route GET /all-competitions
 * @param {string} filter - Query param to filter competitions.
 * @returns {JSON} An array of competition objects filtered based on the provided filter.
 */
router.get('/all-competitions', function (req, res) {
    const {filter} = req.query;

    axios.get(`http://localhost:8081/all-competitions?filter=${filter}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        });
})
/**
 * GET competition details by competition ID.
 *
 * @route GET /get-competitions-by-id
 * @param {number} competitionId - Query param for the competition ID.
 * @returns {JSON} Competition object for the specified competition ID.
 */
router.get('/get-competitions-by-id', function (req, res) {
    const {competitionId} = req.query;

    axios.get(`http://localhost:8081/get-competitions-by-id?competitionId=${competitionId}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        });
})
/**
 * GET a list of competitions categorized by country.
 *
 * @route GET /get-competitions-country
 * @returns {JSON} An array of competition objects categorized by country.
 */
router.get('/get-competitions-country', function (req, res) {
    axios.get(`http://localhost:8081/get-competitions-country`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        });
})

module.exports = router;