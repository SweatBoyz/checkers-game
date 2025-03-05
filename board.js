const socket = new WebSocket('wss://checkers-game-dvwc.onrender.com');

socket.addEventListener('open', () => {
    console.log("Соединение с сервером установлено");
});

socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'start') {
        alert(`Вы играете за ${data.color}`);
    }
});

const board = document.createElement('div');
board.id = 'board';
document.body.appendChild(board);

const rows = 8, cols = 8;
let pieces = [];

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', (row + col) % 2 === 0 ? 'white' : 'black');
        board.appendChild(cell);
        
        if ((row + col) % 2 === 1 && (row < 3 || row > 4)) {
            const piece = document.createElement('div');
            piece.classList.add('piece', row < 3 ? 'red' : 'blue');
            cell.appendChild(piece);
            pieces.push(piece);
        }
    }
}
