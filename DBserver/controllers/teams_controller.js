const Model = require('../models/team_model');
const PlayerModel = require('../models/player_model');


function getAllTeams() {
    return new Promise((resolve, reject) => {
        Model.TeamModel.find({})
            .then((result) =>{
                resolve(result);
            })
            .catch(error=>{
                console.error("Error in getAllTeams:", error);
                reject(error);
            });
    });
}
module.exports.getAllTeams = getAllTeams;

function getTeamById(team_id) {
    return new Promise((resolve, reject) => {
        Model.TeamModel.find({"team.id" : team_id})
            .then((result) =>{
                resolve(result);
            })
            .catch(error=>{
                console.error("Error in getTeamById:", error);
                reject(error);
            });
    });
}
module.exports.getTeamById = getTeamById;

function getPlayerByTeamId(team_id) {
    return new Promise((resolve, reject) => {
        PlayerModel.PlayerModel.find({"team_id" : team_id})
            .then((result) =>{
                resolve(result);
            })
            .catch(error=>{
                console.error("Error in getPlayerByTeamId:", error);
                reject(error);
            });
    });
}

module.exports.getPlayerByTeamId = getPlayerByTeamId;

function getPlayerById(player_id) {
    return new Promise((resolve, reject) => {
        PlayerModel.PlayerModel.find({"id" : player_id})
            .then((result) =>{
                resolve(result);
            })
            .catch(error=>{
                console.error("Error in getPlayerById:", error);
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