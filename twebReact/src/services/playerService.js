import axios from 'axios';
const BASE_URL = 'http://localhost:3001/player'

export const getAppearancesByPlayerId = (playerId) => {
    return axios.get(`${BASE_URL}/get-player-appearances-by-player-id/${playerId}`);
};

export const getAppearancesByGameId = (gameId) => {
    return axios.get(`${BASE_URL}/get-player-appearances-by-game-id/${gameId}`);
};

export const getPlayerByPlayerId = (playerId) => {
    return axios.get(`${BASE_URL}/get-player-by-playerId?filter=${playerId}`);
};

export const getPlayerByTeamId = (clubId) => {
    return axios.get(`${BASE_URL}/get-player-by-team?filter=${clubId}`);
};