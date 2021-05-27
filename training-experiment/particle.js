class Particle {
    constructor(velX, velY) {
        let maxVel = 5;
        this.r = 60;
        this.x = this.r + (Math.random() * (canvas.width - (this.r * 2)));
        this.y = this.r + (Math.random() * (canvas.height - (this.r * 2)));
        this.border = 4;
        this.velX = (Math.random() * maxVel) - maxVel / 2;
        this.velY = (Math.random() * maxVel) - maxVel / 2;
        this.fillColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
        this.lineColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
        this.gravity = 0.5;
        Particle.list.push(this);
    }

    update(timeMultiplier) {

        //this.velY = this.velY + this.gravity

        const moveX = this.velX * timeMultiplier;
        const moveY = this.velY * timeMultiplier;
        const targetX = this.x + moveX;
        const targetY = this.y + moveY;

        if (targetX >= canvas.width - this.r || targetX <= this.r) {
            this.velX = -(this.velX * 0.95);
        }
        if (targetY >= canvas.height - this.r || targetY <= this.r) {
            this.velY = -(this.velY * 0.95);
        }

        this.x = this.x + this.velX * timeMultiplier;
        this.y = this.y + this.velY * timeMultiplier;

        this.draw();
    }

    draw() {
        c.fillStyle = this.fillColor;
        c.lineWidth = this.border;
        c.strokeStyle = this.lineColor;

        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);

        c.stroke();
        c.fill();
    }

    moveUp() {
        this.velY -= 10;
    }


    moveDown() {
        this.velY += 10;
    }

    moveLeft() {
        this.velX -= 10;
    }

    moveRight() {
        this.velX += 10;
    }
}

Particle.list = [];