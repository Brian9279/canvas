class Obstacle {
    constructor() {
        this.width = 50;
        this.baseSpeed = 5;
        this.speed = 5;
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
            this.x -= this.speed * timeMultiplier;
            if (this.x <= canvas.width * (3 / 5)) {
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
        console.log("removed")

        score++
        Obstacle.list.shift();
    }

    collidesWith(player) {
        if (this.x < player.x + player.r &&
            this.x > player.x - player.r) {
            console.log(player, this)
            if (player.y > this.y) {
                console.log("should actually collide")
            } else {
                console.log("should not collide")
            }
            return true

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