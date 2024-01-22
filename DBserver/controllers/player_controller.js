const { PlayerModel} = require('../models/player_model');
const { AppearancesModel } = require('../models/appearances_model');


function getAllPlayers() {
    return new Promise((resolve, reject) => {
        PlayerModel.find({})
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

function getAllPlayerAppearances(player_id) {
    return new Promise((resolve, reject) => {
         AppearancesModel.find({ "player_id" : player_id})
            .then((result) =>{
                console.log("+++++ APPEARANCES RES: ", result);
                resolve(result);
            })
            .catch(error=>{
                console.log("++++++ERROR");
                reject(error);
            });
    });
}


module.exports.getAllPlayerAppearances = getAllPlayerAppearances;

function getAllPlayerAppearancesByGameId(game_id) {
    return new Promise((resolve, reject) => {
        AppearancesModel.find({ "game_id" : game_id})
            .then((result) =>{
                console.log("+++++ APPEARANCES BY GAME ID RES: ", result);
                resolve(result);
            })
            .catch(error=>{
                console.log("++++++ERROR");
                reject(error);
            });
    });
}


module.exports.getAllPlayerAppearancesByGameId = getAllPlayerAppearancesByGameId;

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