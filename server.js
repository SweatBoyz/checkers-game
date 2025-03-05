const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

let players = [];

server.on('connection', (socket) => {
    console.log('Игрок подключился');
    players.push(socket);

    if (players.length === 2) {
        players[0].send(JSON.stringify({ type: 'start', color: 'red' }));
        players[1].send(JSON.stringify({ type: 'start', color: 'blue' }));
    }

    socket.on('message', (message) => {
        players.forEach((player) => {
            if (player !== socket) {
                player.send(message);
            }
        });
    });

    socket.on('close', () => {
        players = players.filter(p => p !== socket);
    });
});

console.log("Сервер запущен на порту 3000");
