var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

canvas.height = window.innerHeight;
// fullscreen
canvas.width = window.innerWidth;
// smartphone
// canvas.width = window.innerHeight / 18 * 9;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//Mouse tracker
var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
});
//colors
var colorPallet = [
    '#0DA7FF',
    '#0CD2E8',
    '#00FFD2',
    '#0CE883',
    'rgba(0, 0, 0, 0.5)'
];

// colorPallet[Math.floor(Math.random() * colorPallet.length)];

//RECT
// c.fillStyle = "rgba(150, 0, 0, 0.8)";
// c.fillRect(100, 100, 100, 100);

//LINE
// c.lineWidth = 10;
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(0, 0);
// c.strokeStyle = "tomato";
// c.stroke();
let bird;

function init() {
    Pipe.list = [];
    bird = new Bird();
    intervalFunction(0);
}

let frame = 0;
var score = 0;

function resetScore() {
    score = 0;
}

function intervalFunction(time) {
    const timeMultiplier = Math.min(((time - lastTime) / 16.67), 1);
    frame++;
    if (frame % 80 === 0) {
        new Pipe();
    }
    lastTime = time;
    c.rect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "rgba(50, 50, 50, 1)";
    c.fill();
    bird.update(timeMultiplier);


    c.font = "30px Arial";
    c.fillStyle = "red";
    c.fillText("Score: " + score, 10, 50);

    for (let i = 0; i < Pipe.list.length; i++) {
        Pipe.list[i].update();
        if (Pipe.list[i].collidesWith(bird)) {
            bird.die();
        }
    }

    if (bird.dead) {
        resetScore();
    }
    if (bird.y >= canvas.height - bird.r || bird.y <= bird.r) {
        bird.die();
    }
    if (bird.dead) {
        return;
    }
    window.requestAnimationFrame((time) => {
        intervalFunction(time);
    })
}


var lastTime = 0;
document.addEventListener("DOMContentLoaded", function(event) {
    init();
});

document.body.onkeydown = function(e) {
    switch (e.key) {
        case ' ':
            if (!bird.dead) {
                bird.jump();
            } else {
                init()
            }
            break;
    }
}