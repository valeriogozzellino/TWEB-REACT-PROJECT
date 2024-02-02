import axios from 'axios';

const apiKey = '62563bbc4e9e5b4871a03be615443210';
const apiUrl =
  'https://gnews.io/api/v4/search?country=it&max=10&category=sport&q=soccer&apikey=' +
  apiKey;

/**
 * Fetches details about footbal news.
 *
 * @returns {Promise<Array>} A promise that resolves with an array containing news fetching by external API.
 */
export const getNews = () => {
  return axios.get(`${apiUrl}`);
};
