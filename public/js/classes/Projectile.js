class Projectile {
  constructor({x, y, radius, color, velocity,attack, id}) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.attack = attack;
    this.id = id;
  }

  draw() {
    push();
    strokeWeight(this.radius*2);
    stroke(color(this.color.r,this.color.g,this.color.b,this.color.a));
    point(this.x, this.y);
    pop();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
