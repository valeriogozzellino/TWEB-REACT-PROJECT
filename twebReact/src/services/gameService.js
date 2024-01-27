import axios from 'axios';
const BASE_URL = 'http://localhost:3001/games';

export const getAllGames = () => {
    return axios.get(`${BASE_URL}/get-games`);
};

export const getClubGamesById = (clubId) => {
    return axios.get(`${BASE_URL}/get-club-games-by-id/${clubId}`);
};