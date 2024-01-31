// Modifica della definizione del socket
import { io } from 'socket.io-client';

/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} id - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const connectToRoom = (currentRoom, socket) => {
  // Aggiungi la stanza al percorso del server durante la connessione
  socket.connect();
};

/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} id - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const disconnectSocket = (socket) => {
  socket.disconnect();
};
/**
 * Fetches details for a specific club by its ID.
 *
 * @param {number} id - The unique identifier of the club to retrieve details for.
 * @returns {Promise<object>} A promise that resolves with an object containing detailed information about the specified club.
 */
export const sockets = {
  teamSock: io(`http://localhost:3001/TeamsChat`),
  playerSock: io(`http://localhost:3001/PlayersChat`),
  gameSock: io(`http://localhost:3001/GamesChat`),
};
