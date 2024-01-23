exports.init = function (io) {
    const playersChat = io.of('PlayersDiscussion')
        .on('connection', function (socket) {
            try {
                /**
                 * it creates or joins a room
                 */
                socket.on('create or join', function (room, firstName, userId) {
                    socket.join(room);
                    chat.to(room).emit('joined', room, userId);
                });

                socket.on('chat', function (room, userId, chatText) {
                    chat.to(room).emit('chat', room, userId, chatText);
                });

                socket.on('disconnect', function () {
                    console.log('someone disconnected');
                });
            } catch (e) {
            }
        });
    const teamsChat= io
        .of('TeamsDiscussion')
        .on('connection', function (socket) {
            try {
                /**
                 * it creates or joins a room
                 */
                socket.on('create or join', function (room, firstName, userId) {
                    socket.join(room);
                    socket.broadcast.to(room).emit('joined', room, userId);
                });

                socket.on('send_message', function (message) {
                    // Ora message è un oggetto con le proprietà text, sender, e time
                    const { text, sender, time } = message;
                    // Aggiungi la logica per gestire il messaggio come desiderato
                    socket.broadcast.to(room).emit('chat message', message);
                });

                socket.on('disconnect', function(){
                    console.log('someone disconnected');
                });
            } catch (e) {
            }
        });
    const competitionChat= io
        .of('CompetitionDiscussion')
        .on('connection', function (socket) {
            try {
                /**
                 * it creates or joins a room
                 */
                socket.on('create or join', function (room, firstName, userId) {
                    socket.join(room);
                    socket.broadcast.to(room).emit('joined', room, userId);
                });

                socket.on('news', function (room, firstName, userId, chatText) {
                    socket.broadcast.to(room).emit('news', room, userId, chatText);
                });

                socket.on('disconnect', function(){
                    console.log('someone disconnected');
                });
            } catch (e) {
            }
        });
}