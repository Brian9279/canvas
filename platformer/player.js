class Player {
    constructor(x, y, radius, velX, velY, fillColor, lineColor) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.border = 4;
        this.velX = velX;
        this.velY = velY;
        this.fillColor = fillColor;
        this.lineColor = lineColor;
        this.gravity = 0.5;
    }

    update(timeMultiplier) {
        this.velY += this.gravity;
        if (this.x >= canvas.width - this.r || this.x <= this.r) {
            this.velX = -this.velX;
        }
        const targetY = this.y + this.velY * timeMultiplier
        this.x += this.velX * timeMultiplier;
        if (targetY < canvas.height) {
            this.y = targetY;
        } else {
            this.y = canvas.height
            this.velY = 0;
        }

        this.draw();
    }

    die() {
        this.dead = true;
        this.fillColor = 'red'
        this.draw();
    }

    draw() {
        // c.fillStyle = this.fillColor;
        // c.lineWidth = this.border;
        // c.strokeStyle = this.lineColor;
        // var imageWidth = 100;
        // var imageHeight = characterImageHeight / characterImageWidth * 100;
        // var imageX = this.x - imageWidth * 0.60;
        // var imageY = this.y - imageHeight * 0.95;
        // c.drawImage(characterImage, Math.round(imageX), Math.round(imageY), imageWidth, imageHeight);

        c.fillStyle = this.fillColor;
        c.lineWidth = this.border;
        c.strokeStyle = this.lineColor;

        c.beginPath();
        c.arc(this.x, this.y - this.r, this.r, 0, Math.PI * 2);

        c.stroke();
        c.fill();
    }

    moveUp() {
        if (this.y >= canvas.height) {
            this.velY += -20;
        }
    }
}


