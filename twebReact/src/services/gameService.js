import axios from 'axios';
const BASE_URL = 'http://localhost:3001/games';
/**
 * Fetches data about games.
 *
 * @returns {Promise<Array>} A promise that resolves with an array containing all the games in the database.
 */
export const getAllGames = () => {
  return axios.get(`${BASE_URL}/get-games`);
};
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} clubId - The unique identifier of the club to retrieve details for.
 * @returns {Promise<Array>} A promise that resolves with an array containing games information about the specified club.
 */
export const getClubGamesById = (clubId) => {
  return axios.get(`${BASE_URL}/get-club-games-by-id/${clubId}`);
};
