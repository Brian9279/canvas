class Bird {
    constructor() {
        this.x = 50;
        this.y = canvas.height / 2;
        this.gravity = 0.3;
        this.r = 20;
        this.border = 4;
        this.velX = 0;
        this.velY = 0;
        this.fillColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
        this.lineColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
        this.dead = false;
    }

    update(timeMultiplier) {
        this.velY += this.gravity;
        this.x += this.velX * timeMultiplier;
        this.y += this.velY * timeMultiplier;

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

    jump() {
        this.velY = -10;
    }

    die() {
        this.dead = true;
        this.fillColor = 'red'
        this.gravity = 0;
        this.velX = 0;
        this.velY = 0;
        this.draw();
    }
}