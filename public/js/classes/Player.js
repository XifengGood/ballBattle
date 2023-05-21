class Player {
  constructor({ x, y, radius, color, score, name }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.score = score;
    this.name = name;
    // not async with server
    this.speed = 4;
    this.projectileSpeed = 15;
    this.projectileSize = 2;
    this.attack = 4;
    this.attackSpeed = 1;
  }
  
  static GetCameraFollowOffset(player) {
    let offset = { x: 0, y: 0 };
    if (cameraFollowRect.width > 0) {
      if (player.x > cameraFollowRect.right) {
        offset.x = -cameraFollowRect.right + width / 2;
      } else if (Collision.xIsInRang(player.x, cameraFollowRect.left, cameraFollowRect.right)) {
        offset.x = -player.x + width / 2;
      }
    } else {
      offset.x = -cameraFollowRect.width / 2;
    }

    if (cameraFollowRect.height > 0) {
      if (player.y > cameraFollowRect.bottom) {
        offset.y = -cameraFollowRect.bottom + height / 2;
      } else if (Collision.xIsInRang(player.y, cameraFollowRect.top, cameraFollowRect.bottom)) {
        offset.y = -player.y + height / 2;
      }
    } else {
      offset.y = -cameraFollowRect.height / 2;
    }
    return offset;
  }

  draw() {
    push();
    strokeWeight(this.radius * 2);
    stroke(color(this.color.r, this.color.g, this.color.b, this.color.a));
    point(this.x, this.y);
    pop();
  }

  move() {
    if (keyIsPressed) {
      // keyCode.W
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        this.y -= this.speed;
      }
      // keyCode.A
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        this.x -= this.speed;
      }
      // keyCode.S
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        this.y += this.speed;
      }
      // keyCode.D
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        this.x += this.speed;
      }
      this.constrain(canvasRect);
      socket.emit("movePlayer", { x: this.x, y: this.y });
    }
  }

  constrain(rect) {
    this.x = constrain(this.x, rect.left + this.radius, rect.left + rect.width - +this.radius);
    this.y = constrain(this.y, rect.top + this.radius, rect.top + rect.height - +this.radius);
  }

  hit(projectile) {
    if (this.radius - projectile.attack < 5) {
      delete players[this];
      socket.emit("playerDead", projectile.id);
      window.dispatchEvent(new Event("onPlayerDie"));
      return;
    }

    this.radius -= projectile.attack;
    socket.emit("updatePlayerState", { radius: this.radius });

    // create explosions
    for (let i = 0; i < min(this.radius * 2, 20); i++) {
      particles.push(
        new Particle({
          x: projectile.x,
          y: projectile.y,
          radius: Math.random() * this.radius,
          color: this.color,
          velocity: {
            x: (Math.random() - 0.5) * (Math.random() * 3),
            y: (Math.random() - 0.5) * (Math.random() * 3)
          }
        })
      )
    }

    socket.emit('updateParticles', particles);
  }



  addBlood({ hp }) {
    console.log("addBlood");
    this.radius += hp;
    this.radius = constrain(this.radius, 5, 200);
    socket.emit("updatePlayerState", { radius: this.radius });
  }

  async addSpeedTemp({ speed, duration }) {
    console.log("addSpeed");
    this.speed += speed;
    await waitforme(duration);
    this.speed -= speed;
  }

  async addProjectileSpeedTemp({ speed, duration }) {
    console.log("addProjectileSpeed");
    this.projectileSpeed += speed;
    await waitforme(duration);
    this.projectileSpeed -= speed;
  }

  async addProjectileSizeTemp({ size, duration }) {
    console.log("addProjectileSize");
    this.projectileSize += size;
    await waitforme(duration);
    this.projectileSize -= size;
  }

  async addAttackTemp({ attack, duration }) {
    console.log("addAttack");
    this.attack += attack;
    await waitforme(duration);
    this.attack -= attack;
  }

  async addAttackSpeedTemp({ attackSpeed, duration }) {
    console.log("addAttackSpeed");
    const attackSpeedLimit = 5;
    if (this.attackSpeed + attackSpeed < attackSpeedLimit) {
      this.attackSpeed += attackSpeed;
      await waitforme(duration);
      this.attackSpeed -= attackSpeed;
    } else {
      const m = attackSpeedLimit - this.attackSpeed;
      this.attackSpeed += m;
      await waitforme(duration);
      this.attackSpeed -= m;
    }
  }


  createProjectile(direction) {
    return new Projectile({
      x: this.x,
      y: this.y,
      radius: 10 * this.projectileSize,
      color: this.color,
      velocity: { x: direction.x * this.projectileSpeed, y: direction.y * this.projectileSpeed },
      attack: this.attack,
      id: socket.id
    });
  }

  async fire() {
    let offset = Player.GetCameraFollowOffset(this);

    const direction = {
      x: mouseX - this.x - offset.x,
      y: mouseY - this.y - offset.y
    };

    const dist = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    direction.x = direction.x / dist;
    direction.y = direction.y / dist;

    projectiles.push(this.createProjectile(direction));

    socket.emit('updateProjectile', projectiles);

    await waitforfire(500 / this.attackSpeed, () => { this.fire(); });
    return;
  }


  getId() {
    if (socket) {
      return socket.id;
    }
  }
}
