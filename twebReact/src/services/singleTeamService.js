import axios from 'axios';
const BASE_URL = 'http://localhost:3001/single-team';

export const getTeamById = (clubId) => {
    return axios.get(`${BASE_URL}/get-team-by-id/${clubId}`);
};
