import axios from 'axios';
const BASE_URL = 'http://localhost:3001/users';

/**
 * Invia i dati dell'utente al server per la registrazione.
 *
 * @param {object} data - Oggetto contenente i dati dell'utente per la registrazione.
 * @returns {Promise<object>} Una promise che si risolve con un oggetto contenente la risposta del server alla richiesta di registrazione.
 */
export const sendUserData = (data) => {
  return axios.post(`${BASE_URL}/sign-up`, data);
};
