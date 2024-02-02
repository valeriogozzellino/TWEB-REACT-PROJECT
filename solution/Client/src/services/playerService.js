import axios from 'axios';
const BASE_URL = 'http://localhost:3001/player';
/**
 * Fetches appearances details for a specific player by their ID.
 *
 * @param {number} playerId - The unique identifier of the player to retrieve appearances for.
 * @returns {Promise<Array>} A promise that resolves with an array containing detailed information about the appearances of the specified player.
 */
export const getAppearancesByPlayerId = (playerId) => {
  return axios.get(
    `${BASE_URL}/get-player-appearances-by-player-id/${playerId}`
  );
};
/**
 * Fetches appearances details for a specific game by its ID.
 *
 * @param {number} gameId - The unique identifier of the game to retrieve appearances for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the appearances in the specified game.
 */
export const getAppearancesByGameId = (gameId) => {
  return axios.get(`${BASE_URL}/get-player-appearances-by-game-id/${gameId}`);
};
/**
 * Fetches details for a specific player by their ID.
 *
 * @param {number} playerId - The unique identifier of the player to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified player.
 */
export const getPlayerByPlayerId = (playerId) => {
  return axios.get(`${BASE_URL}/get-player-by-playerId?filter=${playerId}`);
};
/**
 * Fetches details for players of a specific team by the team's ID.
 *
 * @param {number} clubId - The unique identifier of the team to retrieve player details for.
 * @returns {Promise<Array>} A promise that resolves with an array containing details of players who are part of the specified team.
 */
export const getPlayerByTeamId = (clubId) => {
  return axios.get(`${BASE_URL}/get-player-by-team?filter=${clubId}`);
};

/**
 * Richiede e riceve l'elenco di tutti i giocatori dal server.
 *
 * @returns {Promise<object>} Una promise che si risolve con un oggetto contenente l'elenco dei giocatori.
 */
export const getAllPlayers = () => {
  return axios.get(`${BASE_URL}/get-all-players`);
};
