const randomColor = require('random-color');

class Snake {
    constructor(
            userName, canvas,
            position = {x: 0, y: 0}, 
            tail = 5, 
            trail = [], 
            direction = {x: 20, y: 0}, 
            block = 20
        ) 
    {
        this.position = position;
        this.tail = tail;
        this.trail = trail;
        this.direction = direction;
        this.id = Math.random();
        this.userName = userName;
        this.block = block;
        this.canvas = canvas;
        this.color = randomColor();
    }

    changeDirectory(key) {
        switch (key) {
            case 'a':
                this.direction.x = -this.block;
                this.direction.y = 0;
                break;
            case 'w':
                this.direction.y = -this.block;
                this.direction.x = 0;
                break;
            case 'd':
                this.direction.x = this.block;
                this.direction.y = 0;
                break;
            case 's':   
                this.direction.y = this.block;
                this.direction.x = 0;
        }
    }

    move() {
        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
    }

    teleportation() {
        for(let i = 0; i < this.trail.length; i++) {
            const { x, y } = this.trail[i];

            if(x > this.canvas.width - this.block) {
                this.trail[i].x = 0;
                this.position.x = 0;
            }
            else if(x < 0) {
                this.trail[i].x = this.canvas.width - this.block;
                this.position.x = this.canvas.width - this.block;
            }
            else if(y > this.canvas.height - this.block) {
                this.trail[i].y = 0;
                this.position.y = 0;
            }
            else if(y < 0) {
                this.trail[i].y = this.canvas.height - this.block;
                this.position.y = this.canvas.height - this.block;
            };
        }
    }
}

module.exports = Snake;