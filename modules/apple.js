function createApple (canvas, block) {
    const x = Math.floor(Math.random() * canvas.width / block);
    const y = Math.floor(Math.random() * canvas.height / block);
    
    return {x, y};
}

function eatApple (apples, player) {
    for(let i = 0; i < apples.length; i++) {

        const { x, y } = player.trail[player.trail.length - 1];
        
        console.log(x, y);

        if(apples[i].x * player.block === x && apples[i].y * player.block === y) {
            apples = apples.filter(apple => {
                return apple.x !== apples[i].x && apple.y !== apples[i].y
            });

            return {eat: true, apples};
        } 

        return { eat: false }
    }
}

module.exports = { createApple, eatApple };