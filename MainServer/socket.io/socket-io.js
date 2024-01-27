exports.init = function (io) {


    const playersChat = io.of('/PlayersChat').on('connection', function (socket) {
        try {
            socket.on('joined', function (room, firstName, userId) {
                socket.join(room);
                playersChat.to(room).emit('joined', room, firstName, userId);
            });

            socket.on('send_message', function (room, message, userId) {
                teamsChat.to(room).emit('chat_message',room,  message, userId);
            });

            socket.on('disconnect', function () {
                console.log('someone disconnected');
            });
        } catch (e) {
            console.error(e);
        }
    });

    const teamsChat= io
        .of('/TeamsChat')
        .on('connection', function (socket) {
            try {
                socket.on('joined', function (room, firstName, userId) {
                    socket.join(room);
                    console.log("JOINED THE ROOOOM");
                    teamsChat.to(room).emit('joined', room, firstName, userId);
                });

                socket.on('send_message', function (room, message, userId) {
                    console.log("INVIO MESSAGGIO");
                    teamsChat.to(room).emit('chat_message',room, message, userId);
                });

                socket.on('disconnect', function () {
                    console.log('someone disconnected');
                });
            } catch (e) {
                console.error(e);
            }
        });
    const gamesChat= io
        .of('/GamesChat')
        .on('connection', function (socket) {
            try {
                socket.on('joined', function (room, firstName, userId) {
                    socket.join(room);
                    console.log("JOINED THE ROOOOM");
                    gamesChat.to(room).emit('joined', room, firstName, userId);
                });

                socket.on('send_message', function (room, message, userId) {
                    console.log("INVIO MESSAGGIO");
                    gamesChat.to(room).emit('chat_message',room, message, userId);
                });

                socket.on('disconnect', function () {
                    console.log('someone disconnected');
                });
            } catch (e) {
                console.error(e);
            }
        });
}