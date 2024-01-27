import axios from 'axios';
const BASE_URL = 'http://localhost:3001/teams';

export const getClubBySeason = () => {
    return axios.get(`${BASE_URL}/get-club-season`);
};

export const getAllCountry = () => {
    return axios.get(`${BASE_URL}/get-teams-country`);
};

export const getTeamsBySeasonAndCountry = (filterCountry, filterSeason) => {
    return axios.get(`${BASE_URL}/get-teams-by-season-and-country?filterCountry=${filterCountry}&filterSeason=${filterSeason}`);
};

export const getTeamsByCompetition = (competitionId) => {
    return axios.get(`${BASE_URL}/get-teams-by-competition?filterCompetition=${competitionId}`);
};

