class Particle {
  constructor(x, y, radius, velX, velY, fillColor, lineColor) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.border = 4;
    this.velX = velX;
    this.velY = velY;
    this.fillColor = fillColor;
    this.lineColor = lineColor;
    Particle.list.push(this);
  }

  update(timeMultiplier) {
    if (this.x >= canvas.width - this.r || this.x <= this.r) {
      this.velX = -this.velX;
    }
    if (this.y >= canvas.height - this.r || this.y <= this.r) {
      this.velY = -this.velY;
    }
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
}

Particle.list = [];