const Model = require('../models/team_model');
const PlayerModel = require('../models/player_model');


function getAllTeams() {
    return new Promise((resolve, reject) => {
        Model.TeamModel.find({})
            .then((result) =>{
                console.log("+++++RES TEAMS: ", result);
                resolve(result);
            })
            .catch(error=>{
                console.log("++++++ERROR");
                reject(error);
            });
    });
}


module.exports.getAllTeams = getAllTeams;
function getTeamById(team_id) {
    return new Promise((resolve, reject) => {
        Model.TeamModel.find({"team.id" : team_id})
            .then((result) =>{
                console.log("+++++RES TEAMS: ", result);
                resolve(result);
            })
            .catch(error=>{
                console.log("++++++ERROR");
                reject(error);
            });
    });
}
module.exports.getTeamById = getTeamById;

function getPlayerByTeamId(team_id) {
    console.log("+++++++++ GIOCATORI: ")
    return new Promise((resolve, reject) => {
        PlayerModel.PlayerModel.find({"team_id" : team_id})
            .then((result) =>{
                console.log("+++++RES PLAYERS: ", result);
                resolve(result);
            })
            .catch(error=>{
                console.log("++++++ERROR");
                reject(error);
            });
    });
}

module.exports.getPlayerByTeamId = getPlayerByTeamId;

function getPlayerById(player_id) {
    console.log("+++++++++ GIOCATORE: ")
    return new Promise((resolve, reject) => {
        PlayerModel.PlayerModel.find({"id" : player_id})
            .then((result) =>{
                console.log("+++++RES PLAYER: ", result);
                resolve(result);
            })
            .catch(error=>{
                console.log("++++++ERROR");
                reject(error);
            });
    });
}

module.exports.getPlayerById = getPlayerById;


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