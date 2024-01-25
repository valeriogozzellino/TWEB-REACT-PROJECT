// Modifica della definizione del socket
import { io } from 'socket.io-client';

// Funzione per connetterti a una stanza specifica
export const connectToRoom = (currentRoom, socket) => {
  // Aggiungi la stanza al percorso del server durante la connessione
  socket.connect();
};

// Funzione per disconnettersi
export const disconnectSocket = (socket) => {
  socket.disconnect();
};

export const sockets = {
  teamSock: io(`http://localhost:3001/TeamsChat`),
  playerSock: io(`http://localhost:3001/PlayersChat`),
  gameSock: io(`http://localhost:3001/GamesChat`),
};
