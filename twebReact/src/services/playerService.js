import axios from 'axios';
const BASE_URL = 'http://localhost:3001/player';
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} playerId - The unique identifier of the player to retrieve details for.
 * @returns {Promise<Array>} A promise that resolves with an array containing detailed information about the player Appearences.
 */
export const getAppearancesByPlayerId = (playerId) => {
  return axios.get(
    `${BASE_URL}/get-player-appearances-by-player-id/${playerId}`
  );
};
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} gameId - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const getAppearancesByGameId = (gameId) => {
  return axios.get(`${BASE_URL}/get-player-appearances-by-game-id/${gameId}`);
};
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} id - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const getPlayerByPlayerId = (playerId) => {
  return axios.get(`${BASE_URL}/get-player-by-playerId?filter=${playerId}`);
};
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} id - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const getPlayerByTeamId = (clubId) => {
  return axios.get(`${BASE_URL}/get-player-by-team?filter=${clubId}`);
};
