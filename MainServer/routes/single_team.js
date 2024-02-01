const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");
const {log} = require("debug");


/**
 * GET details of a specific team by team ID (club ID).
 *
 * @route GET /get-team-by-id/:clubId
 * @param {number} clubId - The ID of the club (team).
 * @returns {JSON} Team object details for the specified team ID.
 */
router.get('/get-team-by-id/:clubId', function(req, res) {
    const teamCode = req.params.clubId;

    axios.get(`http://localhost:8081/get-team-by-id/${teamCode}`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Internal Server Error' });
        });
})
module.exports = router;