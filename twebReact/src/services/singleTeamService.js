import axios from 'axios';
const BASE_URL = 'http://localhost:3001/single-team';
/**
 * Fetches details for a specific team by its ID.
 *
 * @param {number} clubId - The unique identifier of the team to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified team.
 */
export const getTeamById = (clubId) => {
  return axios.get(`${BASE_URL}/get-team-by-id/${clubId}`);
};
