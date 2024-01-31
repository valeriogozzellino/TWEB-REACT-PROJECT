import axios from 'axios';
const BASE_URL = 'http://localhost:3001/teams';
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} id - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const getClubBySeason = () => {
  return axios.get(`${BASE_URL}/get-club-season`);
};
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} id - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const getAllCountry = () => {
  return axios.get(`${BASE_URL}/get-teams-country`);
};
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} id - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const getTeamsBySeasonAndCountry = (filterCountry, filterSeason) => {
  return axios.get(
    `${BASE_URL}/get-teams-by-season-and-country?filterCountry=${filterCountry}&filterSeason=${filterSeason}`
  );
};
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} id - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const getTeamsByCompetition = (competitionId) => {
  return axios.get(
    `${BASE_URL}/get-teams-by-competition?filterCompetition=${competitionId}`
  );
};
