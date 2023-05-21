
const canvasRect = new Rect({ top: 0, left: 0, width: 3600, height: 2400 });
let cameraFollowRect;
function init() {
  cameraFollowRect = new Rect(
    {
      left: canvasRect.left + width / 2,
      top: canvasRect.top + height / 2,
      width: canvasRect.width - width,
      height: canvasRect.bottom - height
    }
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  init();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
  initWidget();
  game = new Game();
  game.createProp();
}

function draw() {
  transform();
  drawMap();
  updatePlayers();
  updateProjectiles();
  updateParticles();
  updateProp();
}

function transform() {
  // scale(pixelDensity()/displayDensity());
  if (players[socket.id]) {
    let offset = Player.GetCameraFollowOffset(players[socket.id]);
    translate(offset.x, offset.y);
  } else {
    let offset = Player.GetCameraFollowOffset({ x: width / 2, y: height / 2 });
    translate(offset.x, offset.y);
  }
}

function drawMap() {
  background('rgba(0, 0, 0, 0.1)');
  push();
  for (let i = 0; i < 20; i++) {
    stroke('#FFDDAA');
    point(i * canvasRect.width / 20, i * canvasRect.height / 20);
    point((20 - i) * canvasRect.width / 20, i * canvasRect.height / 20);
  }
  noFill();
  strokeWeight(5);
  stroke(23, 45, 35, 200);
  rect(canvasRect.left, canvasRect.top, canvasRect.right, canvasRect.bottom, 10);
  pop();
}

function updatePlayers() {
  for (const id in players) {
    const player = players[id];
    player.draw();
    if (id == socket.id) {
      player.move();
    }
  }
}

function updateProjectiles() {
  projectiles.forEach((ele, index) => {
    if (ele == null || ele == undefined) {
      return;
    };
    ele.update();

    // Collsion
    const player = players[socket.id];
    if (ele.id != socket.id && player && Collision.pointIsInPoint(ele, player)) {
      console.log('has insert');
      player.hit(ele);
      projectiles.splice(index, 1);
      socket.emit('updateProjectile', projectiles);
    }

    // remove from edges of screen
    if (!Collision.pointIsInRect(ele, canvasRect)) {
      projectiles.splice(index, 1);
      socket.emit('updateProjectile', projectiles);
    }

  });
}

function updateParticles() {
  particles.forEach((ele, index) => {
    ele.update();

    if (ele.alpha < 0) {
      particles.splice(index, 1);
    }
  })
}

function updateProp() {
  props.forEach((prop, index) => {
    prop.update();

    // collision detect
    const player = players[socket.id];
    if (player && Collision.pointIsInPoint(prop, player)) {
      props.splice(index, 1);
      prop.use(player);
    }
  })
}

