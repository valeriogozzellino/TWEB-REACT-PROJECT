import axios from 'axios';
const BASE_URL = 'http://localhost:3001/single-game';
/**
 * Fetches event details for a specific game by its ID.
 *
 * @param {number} gameId - The unique identifier of the game to retrieve event details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the events in the specified game.
 */
export const getGameEventsById = (gameId) => {
  return axios.get(`${BASE_URL}/get-game-events-by-id/${gameId}`);
};
/**
 * Fetches details for a specific game by its ID.
 *
 * @param {number} gameId - The unique identifier of the game to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified game.
 */
export const getGameById = (gameId) => {
  return axios.get(`${BASE_URL}/get-game-by-id/${gameId}`);
};
