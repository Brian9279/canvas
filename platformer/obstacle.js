class Obstacle {
    constructor() {
        this.width = 50;
        this.isSkyObstacle = (Math.random() > 0.5);
        if (this.isSkyObstacle) {
            if (Math.random() > 0.5) {
                this.y = canvas.height - 200;
            } else {
                this.y = canvas.height - 400;
            }

        } else {
            this.y = canvas.height;
        }
        this.x = canvas.width

        this.hasSpawnedNextObstacle = false;

        this.obstacleSize = 100;

        this.fillColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
        Obstacle.list.push(this);
    }

    update(timeMultiplier) {
        if (this.x > -this.width) {
            this.x -= speed * timeMultiplier;

            if (this.x <= canvas.width * (1 / 2)) {
                if (!this.hasSpawnedNextObstacle) {
                    new Obstacle();
                    this.hasSpawnedNextObstacle = true;
                }
            }
        } else {
            this.remove()
        }


        this.draw();
    }

    remove() {
        score++
        //console.log(score % 5)
        if (score % 5 == 0 && speed < 17) {
            console.log("Speed erhöht");
            speed = speed + 2;
        }
        Obstacle.list.shift();
    }

    collidesWith(player) {
        var obstacleTop = this.y - this.obstacleSize;
        var obstacleBottom = this.y;
        var obstacleRight = this.x + this.width;
        var obstacleLeft = this.x;
        var circleBottom = player.y;
        var circleTop = player.y - (player.r * 2);
        var circleLeft = player.x - player.r;
        var circleRight = player.x + player.r;

        if (circleLeft < obstacleRight &&
            circleRight > obstacleLeft) {
            if (circleBottom > obstacleTop
                && circleTop < obstacleBottom) {
                return true
            }
        }
    }

    draw() {
        c.beginPath();
        // c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.fillStyle = this.fillColor;

        c.fillRect(this.x, this.y - this.obstacleSize, this.width, this.obstacleSize);
    }
}

Obstacle.list = [];