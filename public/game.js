const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const socket = io();
const block = 20;

socket.emit('enter', {
    userName: 'player', 
    canvas: {
        width: canvas.width,
        height: canvas.height
    }
});

socket.on('render', render);

document.addEventListener('keypress', (e) => {
    socket.emit('key', e.key);
});

function render ({snakes, apples}) {

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snakes.length; i++) {
        renderSnake(snakes, i);
    }
    
    for(let i = 0; i < apples.length; i++) {
        const { x, y } = apples[i];

        ctx.fillStyle = 'tomato';
        ctx.fillRect(x * block, y * block, block, block);
    }

}

function renderSnake(snakes, index) {
    const snake = snakes[index];


    for(let i = 0; i < snake.trail.length; i++) {
        const { x, y } = snake.trail[i];

        ctx.fillStyle = `rgba(${snake.color.r}, ${snake.color.g}, ${snake.color.b}, 0.5)`;
        ctx.fillRect(x, y, block, block);
    }
}