import axios from 'axios';

const BASE_URL = 'http://localhost:3001/single-game';
const PLAYER_URL = 'http://localhost:3001/player'

export const getAppearancesByPlayerId = (playerId) => {
    return axios.get(`${BASE_URL}/get-player-appearances-by-player-id/${playerId}`);
};

export const getAppearancesByGameId = (gameId) => {
    return axios.get(`${PLAYER_URL}/get-player-appearances-by-game-id/${gameId}`);
};