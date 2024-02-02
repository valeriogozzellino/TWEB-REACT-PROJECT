const { AppearancesModel } = require('../models/appearances_model');

/**
 * Retrieves all appearances for a specific player by the player's ID.
 *
 * @param {string} player_id - The ID of the player.
 * @returns {Promise<Array>} A promise that resolves with an array of appearance objects.
 */
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
/**
 * Retrieves all appearances for a specific game by the game's ID.
 *
 * @param {string} game_id - The ID of the game.
 * @returns {Promise<Array>} A promise that resolves with an array of appearance objects.
 */
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

/**
 * Inserts a new document into the database.
 *
 * @param {Object} body - The data to be inserted.
 * @returns {Promise<Object>} A promise that resolves with the result of the insertion operation.
 */
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

/**
 * Retrieves all documents from the database.
 *
 * @returns {Promise<Array>} A promise that resolves with an array of documents.
 */
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