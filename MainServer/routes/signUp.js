const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


router.get('/', function(req, res) {
    const signUpFilePath = path.join(__dirname, '../public/signUp.html');
    res.sendFile(signUpFilePath);
});

module.exports = router;