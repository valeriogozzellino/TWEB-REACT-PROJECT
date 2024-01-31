import axios from 'axios';
const BASE_URL = 'http://localhost:3001/competitions';
/**
 * Fetches details for a competition by its ID.
 *
 * @param {number} competitionId - The unique identifier of the competition to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing competition.
 */
export const getCompetitionsById = (competitionId) => {
  return axios.get(
    `${BASE_URL}/get-competitions-by-id?competitionId=${competitionId}`
  );
};
/**
 * Fetches details for all countries with competitions.
 *
 * @returns {Promise<Array>} A promise that resolves with an Array containing countries of competitions.
 */
export const getAllCountries = () => {
  return axios.get(`${BASE_URL}/get-competitions-country`);
};
/**
 * Fetches details for all competitions based on a filter.
 *
 * @param {string} filter - The filter for competitions.
 * @returns {Promise<Array>} A promise that resolves with an Array of competitions using the country as filter.
 */
export const getAllCompetitions = (filter) => {
  return axios.get(`${BASE_URL}/all-competitions?filter=${filter}`);
};
