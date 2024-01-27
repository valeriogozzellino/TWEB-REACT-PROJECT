var express = require('express');
const axios = require("axios");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/sign-up', function(req, res) {
  const data = req.body; // Utilizza req.body per ottenere i dati dal corpo della richiesta

  axios.post('http://localhost:8081/sign-up', data)
      .then(response => {
        res.json(response.data)
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
});

module.exports = router;
