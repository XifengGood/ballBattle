const friction = 0.99
class Particle {
  constructor({x, y, radius, color, velocity}) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    // * alpha not implement
    push();
    strokeWeight(this.radius*2);
    stroke(color(this.color.r,this.color.g,this.color.b,this.alpha*255));
    point(this.x, this.y);
    pop();
  }

  update() {
    this.draw()
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    this.alpha -= 0.01
  }
}
