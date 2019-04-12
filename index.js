const express = require('express');
const http = require('http');
const io = require('socket.io');
const path = require('path');
const print = require('colorprint');
const Snake = require('./modules/snake');
const { createApple } = require('./modules/apple');

const app = express();
const server = http.createServer(app);
const socketIo = io(server);

let snakes = [];
let apples = [];

app.use('/static/', express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

socketIo.on('connection', (socket) => {
        
    let player;

    socket.on('enter', (data) => {
        player = new Snake(userName = data.userName, canvas = data.canvas); 
        snakes.push(player);
    });

    socket.on('key', (key) => {
        player.changeDirectory(key);
    });

    socket.on('disconnect', () => {
        if(player) {
            snakes = snakes.filter(snake => snake.id !== player.id);
        }
    });

    setInterval(() => {

        if(player) {
            if(apples.length < 3) {
                apples.push(createApple(player.canvas, player.block));
            }

            player.move();

            player.trail.push({
                x: player.position.x,
                y: player.position.y
            });

            //eat apples 

            for(let i = 0; i < apples.length; i++) {
                const { x, y } = player.position;

                if(x === apples[i].x * player.block && y === apples[i].y * player.block) {

                    apples.splice(i, 1);
                    player.tail += 1;

                }
            }

            //smash 

            for(let i = 0; i < snakes.length; i++) {
                const { x, y } = player.position;
                if(snakes[i].id !== player.id) {
                    const trail = snakes[i].trail

                    for(let j = 0; j < trail.length; j++) {

                        if(trail[j].x === x && trail[j].y === y) {

                            snakes = snakes.filter(snake => {
                                return snake.id !== player.id;
                            })

                        }

                    }
                }
            }
 
            

            if(player.trail.length > player.tail) player.trail.shift();

            player.teleportation(); 
        }

        socketIo.emit('render', { snakes, apples })

    }, 1000 / 15);


});

server.listen(process.env.PORT || 5000, () => {
    console.log('--------------------------');
    console.log('--------------------------');
    print.notice('--[ Server has started ]--');
    console.log('--------------------------');
    console.log('--------------------------');
});