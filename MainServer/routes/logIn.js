const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


router.get('/', function(req, res) {
    const logInFilePath = path.join(__dirname, '../public/logIn.html');
    res.sendFile(logInFilePath);
});
router.get('/check-credentials', function(req, res) {
    const { email, password } = req.query;
    axios.get(`http://localhost:8081/check-credentials?email=${email}&password=${password}`)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
module.exports = router;