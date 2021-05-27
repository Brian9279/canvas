class Particle {
    constructor(velX, velY) {
        this.r = 10;
        this.x = this.r + (Math.random() * (canvas.width - (this.r * 2)));
        this.y = this.r + (Math.random() * (canvas.height - (this.r * 2)));
        this.border = 4;
        this.velX = (Math.random() * 100) - 9;
        this.velY = (Math.random() * 100) - 5;
        this.fillColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
        this.lineColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
        this.gravity = 0.5;
        Particle.list.push(this);
    }

    update(timeMultiplier) {

        this.velY = this.velY + this.gravity

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
}

Particle.list = [];