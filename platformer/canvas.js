var canvas = document.querySelector("canvas");
var characterImage = document.getElementById("characterImage");
var characterImageWidth = 0;
var characterImageHeight = 0;

characterImage.onload = function() {
    characterImageWidth = this.width;
    characterImageHeight = this.height;
}
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
// c.fillRect(400, 100, 100, 100);
// c.fillRect(300, 300, 100, 100);

//LINE
// c.lineWidth = 10;
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(0, 0);
// c.strokeStyle = "tomato";
// c.stroke();
let player;
var score = 0;


function resetScore() {
    score = 0;
}

function init() {
    Player.list = [];
    let r = 50;
    let x = 100;
    let y = canvas.height;
    let borderColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
    let fillColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
    player = new Player(x, y, r, 0, 0, fillColor, borderColor);
    new Obstacle();
    intervalFunction(0);
    resetScore()
}

function intervalFunction(time) {
    const fps = Math.floor(1000 / (time - lastTime) * 10) / 10
    const timeMultiplier = Math.min(((time - lastTime) / 16.67), 1);
    lastTime = time;
    c.rect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "rgba(50, 50, 50, 1)";
    c.fill();

    c.font = "30px Arial";
    c.fillStyle = "red";
    c.fillText(fps, 10, 50);

    c.font = "30px Arial";
    c.fillStyle = "red";
    c.fillText("Score: " + score, 10, 100);


    player.update(timeMultiplier);

    Obstacle.list.forEach(obstacle => {
        obstacle.update(timeMultiplier)
        if (obstacle.collidesWith(player)) {
            player.die();
        }
    });
    if (player.dead) {
        return;
    }
    window.requestAnimationFrame((time) => {
        intervalFunction(time);
    });
}


var lastTime = 0;
document.addEventListener("DOMContentLoaded", function(event) {
    init();
});

document.body.onkeydown = function(e) {
    switch (e.key) {
        case ' ':
            break;
        case "Down": // IE/Edge specific value
        case "ArrowDown":
            break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
            player.moveUp();
            break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
            break;
    }
}