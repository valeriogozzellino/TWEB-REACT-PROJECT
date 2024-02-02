// Modifica della definizione del socket
import { io } from 'socket.io-client';

/**
 * Connects the socket to a specific room.
 *
 * @param {string} currentRoom - The name of the room to connect to.
 * @param {object} socket - The socket instance to connect.
 */
export const connectToRoom = (currentRoom, socket) => {
  socket.connect();
};

/**
 * Disconnects the provided socket.
 *
 * @param {object} socket - The socket instance to disconnect.
 */
export const disconnectSocket = (socket) => {
  socket.disconnect();
};
/**
 * Collection of socket instances connected to different namespaces.
 * Each socket is connected to a separate namespace for a specific chat room.
 */
export const sockets = {
  teamSock: io(`http://localhost:3001/TeamsChat`),
  playerSock: io(`http://localhost:3001/PlayersChat`),
  gameSock: io(`http://localhost:3001/GamesChat`),
};
