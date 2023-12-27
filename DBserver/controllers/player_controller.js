const Model = require('../models/player_model');

function getAllPlayers() {
    return new Promise((resolve, reject) => {
        Model.PlayerModel.find({})
            .then((result) =>{
                console.log("+++++RES: ", result);
                resolve(result);
            })
            .catch(error=>{
                console.log("++++++ERROR");
                reject(error);
            });
    });
}


module.exports.getAllPlayers = getAllPlayers;

function insert(body) {
    return new Promise((resolve, reject) => {
        const mongoObj = new Model(body);
        mongoObj.save()
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.insert = insert;


function query() {
    return new Promise((resolve, reject) => {
        Model.find()
            .then((result) =>{
                console.log(result);
                resolve.json(result);
            })
            .catch(error=>{
                reject(error);
            });
    });
}

module.exports.query = query;