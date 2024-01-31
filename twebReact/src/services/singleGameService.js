import axios from 'axios';
const BASE_URL = 'http://localhost:3001/single-game';
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} id - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const getGameEventsById = (gameId) => {
  return axios.get(`${BASE_URL}/get-game-events-by-id/${gameId}`);
};
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} id - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const getGameById = (gameId) => {
  return axios.get(`${BASE_URL}/get-game-by-id/${gameId}`);
};
