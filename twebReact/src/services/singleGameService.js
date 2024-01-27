import axios from 'axios';
const BASE_URL = 'http://localhost:3001/single-game';

export const getGameEventsById = (gameId) => {
    return axios.get(`${BASE_URL}/get-game-events-by-id/${gameId}`);
};

export const getGameById = (gameId) => {
    return axios.get(`${BASE_URL}/get-game-by-id/${gameId}`);
};



