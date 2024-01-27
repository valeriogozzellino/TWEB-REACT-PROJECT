import axios from 'axios';
const BASE_URL = 'http://localhost:3001/competitions';

export const getCompetitionsById = (competitionId) => {
    return axios.get(`${BASE_URL}/get-competitions-by-id?competitionId=${competitionId}`);
};

export const getAllCountries = () => {
    return axios.get(`${BASE_URL}/get-competitions-country`);
};

export const getAllCompetitions = (filter) => {
    return axios.get(`${BASE_URL}/all-competitions?filter=${filter}`);
};