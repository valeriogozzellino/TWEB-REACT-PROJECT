import axios from 'axios';
const BASE_URL = 'http://localhost:3001/teams';
/**
 * Fetches a list of all seasons in which clubs have participated.
 *
 * @returns {Promise<Array>} A promise that resolves with an array containing the years of seasons in which clubs have participated.
 */
export const getClubBySeason = () => {
  return axios.get(`${BASE_URL}/get-club-season`);
};
/**
 * Fetches a list of all countries that have clubs.
 *
 * @returns {Promise<Array>} A promise that resolves with an array containing the names of countries that have clubs.
 */
export const getAllCountry = () => {
  return axios.get(`${BASE_URL}/get-teams-country`);
};
/**
 * Fetches details of teams filtered by season and country.
 *
 * @param {string} filterCountry - The country name to filter teams by.
 * @param {number} filterSeason - The season year to filter teams by.
 * @returns {Promise<Array>} A promise that resolves with an array containing details of teams filtered by the specified season and country.
 */
export const getTeamsBySeasonAndCountry = (filterCountry, filterSeason) => {
  return axios.get(
    `${BASE_URL}/get-teams-by-season-and-country?filterCountry=${filterCountry}&filterSeason=${filterSeason}`
  );
};
/**
 * Fetches details of teams participating in a specific competition.
 *
 * @param {string} competitionId - The unique identifier of the competition to retrieve teams for.
 * @returns {Promise<Array>} A promise that resolves with an array containing details of teams participating in the specified competition.
 */
export const getTeamsByCompetition = (competitionId) => {
  return axios.get(
    `${BASE_URL}/get-teams-by-competition?filterCompetition=${competitionId}`
  );
};
