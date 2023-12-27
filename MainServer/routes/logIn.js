const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require("axios");


router.get('/', function(req, res) {
    const logInFilePath = path.join(__dirname, '../public/logIn.html');
    res.sendFile(logInFilePath);
});
module.exports = router;