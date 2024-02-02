const { GameModel } = require('../models/games_model');
const { GameEventModel } = require('../models/game_events_model');
/**
 * Retrieves all games from the database for the current season.
 *
 * @returns {Promise<Array>} A promise that resolves with an array of game objects.
 */
function getAllGames() {
    return new Promise((resolve, reject) => {
        GameModel.find({ season: { $gte: 2022 } })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                console.error("Error in getAllGames:", error);
                reject(error);
            });
    });
}

module.exports.getAllGames = getAllGames;

/**
 * Retrieves a specific game by its ID.
 *
 * @param {string} game_id - The ID of the game.
 * @returns {Promise<Object>} A promise that resolves with the game object.
 */
function getGameByID(game_id) {
    return new Promise((resolve, reject) => {
        GameModel.find({ game_id: game_id })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                console.error("Error in getGameByID:", error);
                reject(error);
            });
    });
}

module.exports.getGameByID = getGameByID;

/**
 * Retrieves all games of a specific club by the club's ID.
 *
 * @param {string} club_id - The ID of the club.
 * @returns {Promise<Array>} A promise that resolves with an array of game objects.
 */
function getClubGameByID(club_id) {
    return new Promise((resolve, reject) => {
        GameModel.find({ home_club_id: club_id })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                console.error("Error in getClubGameByID:", error);
                reject(error);
            });
    });
}

module.exports.getClubGameByID = getClubGameByID;

/**
 * Retrieves all game events for a specific game by the game's ID.
 *
 * @param {string} game_id - The ID of the game.
 * @returns {Promise<Array>} A promise that resolves with an array of game event objects.
 */
function getAllGamesEvents(game_id) {
    return new Promise((resolve, reject) => {
        GameEventModel.find({ game_id: game_id } )
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                console.error("Error in getGamesEvent:", error);
                reject(error);
            });
    });
}

module.exports.getAllGamesEvents = getAllGamesEvents;

/**
 * Retrieves specific game events by the game's ID.
 *
 * @param {string} game_id - The ID of the game.
 * @returns {Promise<Array>} A promise that resolves with an array of game event objects.
 */
function getGameEventById(game_id) {
    return new Promise((resolve, reject) => {
        GameEventModel.find({ game_id: game_id } )
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                console.error("Error in getGamesEvent:", error);
                reject(error);
            });
    });
}

module.exports.getGameEventById = getGameEventById;