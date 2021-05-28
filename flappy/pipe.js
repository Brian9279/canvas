class Pipe {
    constructor() {
        this.width = 50;
        this.baseSpeed = 5;
        this.speed = 5;
        this.x = canvas.width

        this.holeSize = (Math.random() * 200) + 100
        this.holePosition = Math.random() * canvas.height;

        this.fillColor = colorPallet[Math.floor(Math.random() * colorPallet.length)];
        Pipe.list.push(this);
    }

    update(timeMultiplier) {
        if (this.x > -this.width) {
            this.x -= this.speed * timeMultiplier;
        } else {
            this.remove()
        }


        this.draw();
    }

    remove() {
        console.log("removed")
        score++
        console.log("score", score)
        Pipe.list.shift();
    }

    collidesWith(bird) {
        if (this.x < bird.x + bird.r &&
            this.x > bird.x - bird.r) {

            if (this.holePosition - this.holeSize / 2 > bird.y + bird.r ||
                this.holePosition + this.holeSize / 2 < bird.y - bird.r) {
                return true;
            }

        }

    }

    draw() {

        c.beginPath();
        // c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.fillStyle = this.fillColor;

        c.fillRect(this.x, 0, this.width, this.holePosition - (this.holeSize / 2));
        const secondPipeStart = this.holePosition + (this.holeSize / 2);
        c.fillRect(this.x, secondPipeStart, this.width, canvas.height - secondPipeStart);
    }
}

Pipe.list = [];