const WebSocket = require('ws');
const http = require('http');

// Создание HTTP сервера
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

// Создание WebSocket сервера
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Отправить сообщение о начале игры и цвете игрока
  ws.send(JSON.stringify({ type: 'start', color: 'red' }));

  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
});

// Обработчик upgrade-запросов для WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Используем порт, назначенный Render, или порт по умолчанию 3000
const port = process.env.PORT || 3000;

// Запуск сервера
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

