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
var speed = 5;
var lastTime = 0;
var paused = false

function resetScore() {
    score = 0;
}

function init() {
    Obstacle.list = [];
    let r = 50;
    let x = 100;
    let y = canvas.height;
    let borderColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
    let fillColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
    player = new Player(x, y, r, 0, 0, fillColor, borderColor);
    speed = 5;
    lastTime = 0;
    new Obstacle();
    intervalFunction(0);
    resetScore();
}

function clearCanvas() {
    c.rect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "rgba(50, 50, 50, 1)";
    c.fill();
}

function displayFps(fps) {
    c.font = "30px Arial";
    c.fillStyle = "red";
    c.fillText(fps, 10, 50);
}

function displayScore() {
    c.font = "30px Arial";
    c.fillStyle = "red";
    c.fillText("Score: " + score, 10, 100);
}

function displayGameOverText() {
    var gameOverText = "GAME OVER";
    var scoreText = "Finalscore: " + score;
    var helpText = "Press space to try again -_-";

    c.font = "100px Arial";
    c.fillStyle = "red";
    c.fillText(gameOverText, canvas.width / 2 - c.measureText(gameOverText).width / 2, canvas.height / 2);
    c.font = "30px Arial";
    c.fillStyle = "red";
    c.fillText(
        scoreText,
        canvas.width / 2 - c.measureText(scoreText).width / 2,
        canvas.height / 2 + 50
    );
    c.font = "40px Arial";
    c.fillStyle = "green";
    c.fillText(
        helpText,
        canvas.width / 2 - c.measureText(helpText).width / 2,
        canvas.height / 2 + 150
    );
}

function displayPauseText() {
    c.font = "100px Arial";
    c.fillStyle = "gold";
    var pausedText = "Press Esc to resume the game";
    c.fillText(pausedText, canvas.width / 2 - c.measureText(pausedText).width / 2, canvas.height / 2);
}

function intervalFunction(time) {
    const fps = Math.floor(1000 / (time - lastTime) * 10) / 10
    const timeMultiplier = Math.min(((time - lastTime) / 16.67), 1);
    lastTime = time;

    clearCanvas();
    displayScore();
    displayFps(fps);

    player.update(timeMultiplier);

    Obstacle.list.forEach(obstacle => {
        obstacle.update(timeMultiplier)
        if (obstacle.collidesWith(player)) {
            player.die();
        }
    });
    if (player.dead) {
        displayGameOverText();

        return;
    }
    if (paused) {
        displayPauseText();

        return;
    }
    window.requestAnimationFrame((time) => {
        intervalFunction(time);
    });
}


document.addEventListener("DOMContentLoaded", function(event) {
    init();
});

document.body.onkeydown = function(e) {
    switch (e.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":

            break;
        case "Esc": // IE/Edge specific value
        case "Escape":
            if (paused) {
                paused = false;
                lastTime = 0;
                intervalFunction(0);
            } else {
                paused = true;
            }
            break;
        case ' ':
            if (player.dead) {
                init();
            }
        case 'w':
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