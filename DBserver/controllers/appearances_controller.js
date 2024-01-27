const { AppearancesModel } = require('../models/appearances_model');


function getAllPlayerAppearances(player_id) {
    return new Promise((resolve, reject) => {
         AppearancesModel.find({ "player_id" : player_id})
            .then((result) =>{
                resolve(result);
            })
            .catch(error=>{
                console.error("Error in getAllPlayerAppearances:", error);
                reject(error);
            });
    });
}


module.exports.getAllPlayerAppearances = getAllPlayerAppearances;

function getAllPlayerAppearancesByGameId(game_id) {
    return new Promise((resolve, reject) => {
        AppearancesModel.find({ "game_id" : game_id})
            .then((result) =>{
                resolve(result);
            })
            .catch(error=>{
                console.error("Error in getAllPlayerAppearancesByGameId:", error);
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
                resolve.json(result);
            })
            .catch(error=>{
                reject(error);
            });
    });
}

module.exports.query = query;