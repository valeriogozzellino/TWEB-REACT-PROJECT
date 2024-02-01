import axios from 'axios';
const BASE_URL = 'http://localhost:3001/competitions';
/**
 * Fetches details for a specific competition by its ID.
 *
 * @param {number} competitionId - The unique identifier of the competition to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified competition.
 */
export const getCompetitionsById = (competitionId) => {
  return axios.get(
    `${BASE_URL}/get-competitions-by-id?competitionId=${competitionId}`
  );
};
/**
 * Fetches a list of all countries that host competitions.
 *
 * @returns {Promise<Array>} A promise that resolves with an array containing the names of countries that host competitions.
 */
export const getAllCountries = () => {
  return axios.get(`${BASE_URL}/get-competitions-country`);
};
/**
 * Fetches details for all competitions, optionally filtered by a specific country.
 *
 * @param {string} filter - The country name to filter competitions by, or 'All' to fetch all competitions without filtering.
 * @returns {Promise<Array>} A promise that resolves with an array containing detailed information about competitions, filtered by the specified country if provided.
 */
export const getAllCompetitions = (filter) => {
  return axios.get(`${BASE_URL}/all-competitions?filter=${filter}`);
};
