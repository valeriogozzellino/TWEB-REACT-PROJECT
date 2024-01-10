const { GameModel } = require('../models/games_model');
const { GameEventModel } = require('../models/game_events_model');
const { ClubGamesModel } = require('../models/club_games_model');

function getAllGames() {
    console.log("+++ GAMES");
    return new Promise((resolve, reject) => {
        GameModel.find({ season: { $gte: 2022 } })
            .then(result => {
                // console.log("RES: ", result);
                resolve(result);
            })
            .catch(error => {
                console.error("Error in getAllGames:", error);
                reject(error);
            });
    });
}

module.exports.getAllGames = getAllGames;

function getGameByID(game_id) {
    console.log("+++ GAMEEEEEEEEE");
    return new Promise((resolve, reject) => {
        GameModel.find({ game_id: game_id })
            .then(result => {
                // console.log("RES: ", result);
                resolve(result);
            })
            .catch(error => {
                console.error("Error in getGameByID:", error);
                reject(error);
            });
    });
}

module.exports.getGameByID = getGameByID;


function getClubGameByID(club_id) {
    console.log("+++ CLUB GAMEEEEEEEEE");
    return new Promise((resolve, reject) => {
        ClubGamesModel.find({ club_id: club_id })
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


function getAllGamesEvents(game_id) {
    console.log("+++ GAMES EVENT");
    return new Promise((resolve, reject) => {
        GameEventModel.find({ game_id: game_id } ) // Use GameModel directly
            .then(result => {
                console.log("RES: ", result);
                resolve(result);
            })
            .catch(error => {
                console.error("Error in getGamesEvent:", error); // More specific error log
                reject(error);
            });
    });
}

module.exports.getAllGamesEvents = getAllGamesEvents;

function getGameEventById(game_id) {
    console.log("+++ GAME EVENTS");
    return new Promise((resolve, reject) => {
        GameEventModel.find({ game_id: game_id } )
            .then(result => {
                // console.log("RES: ", result);
                resolve(result);
            })
            .catch(error => {
                console.error("Error in getGamesEvent:", error);
                reject(error);
            });
    });
}

module.exports.getGameEventById = getGameEventById;