import axios from 'axios';
const BASE_URL = 'http://localhost:3001/games';
/**
 * Fetches data about all games from the database.
 *
 * @returns {Promise<Array>} A promise that resolves with an array containing detailed information about all the games.
 */
export const getAllGames = () => {
  return axios.get(`${BASE_URL}/get-games`);
};
/**
 * Fetches game details for a specific club by the club's ID.
 *
 * @param {number} clubId - The unique identifier of the club to retrieve game details for.
 * @returns {Promise<Array>} A promise that resolves with an array containing detailed information about the games associated with the specified club.
 */
export const getClubGamesById = (clubId) => {
  return axios.get(`${BASE_URL}/get-club-games-by-id/${clubId}`);
};
