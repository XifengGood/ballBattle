const PlayerInfo = require('./Classes/PlayerInfo');
const OnlinePlayer = require('./Classes/OnlinePlayer');

const express = require('express');
const app = express();

// socket.io setup
const http = require('http');
const { emit } = require('process');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 });
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// just current running on the server
const playerInfomation = new Map();

//the online player in this game
const onlinePlayers = {};

const props = {};
let propId = 0;

function getRank() {
  const rank = [];
  playerInfomation.forEach((value, key) => {
    rank.push({ name: value.name, score: value.score });
  })
  rank.sort((a, b) => { return b.score - a.score; });
  console.log('rank:');
  console.log(rank);
  return rank;
}

io.on('connection', (socket) => {
  console.log(`a user connected:\t${socket.id}`);
  socket.emit('updatePlayers', onlinePlayers);
  socket.emit('updateProps', props);
  socket.emit('updateRank', getRank().slice(0, 2));
  
  socket.on('playerJoinGame', (player, callback) => {
    console.log(`${player.name} join game`);
    onlinePlayers[socket.id] = new OnlinePlayer(player);
    if (!playerInfomation.has(player.name)) {
      playerInfomation.set(player.name, new PlayerInfo(player));
    }
    socket.emit('updatePlayers', onlinePlayers);
    socket.broadcast.emit('playerJoinGame', socket.id, player);
    io.emit('updateRank', getRank().slice(0, 2));

    callback('ok');
  });

  socket.on('playerDead', (killer) => {
    if (onlinePlayers[killer]) {
      console.log(`Killer: ${killer}`);
      const playerKiller = onlinePlayers[killer];
      playerKiller.score++;
      playerInfomation.get(playerKiller.name).score++;
      io.emit('updateRank', getRank().slice(0, 2));
    }

    if (onlinePlayers[socket.id]) {
      delete onlinePlayers[socket.id];
      io.emit('removePlayer', socket.id);
    }
  })

  socket.on('disconnect', (reason) => {
    console.log(`a user disconnected ${reason}`);
    delete onlinePlayers[socket.id];
    io.emit('removePlayer', socket.id);
  });

  socket.on('movePlayer', (player) => {
    if (onlinePlayers[socket.id]) {
      const onlinePlayer = onlinePlayers[socket.id];
      onlinePlayer.x = player.x;
      onlinePlayer.y = player.y;
      socket.broadcast.emit('updatePlayerPos',socket.id,onlinePlayer);
    }
  });

  socket.on('updateProjectile', (newProjectiles) => {
    const projectiles = [];
    newProjectiles.forEach((ele) => { projectiles.push(ele); });
    socket.broadcast.emit('updateProjectile', projectiles);
    console.log(`projectiles num:\t${projectiles.length}`);
  });

  socket.on('updateParticles', (newParticles) => {
    const particles = [];
    newParticles.forEach((ele) => { particles.push(ele); });
    socket.broadcast.emit('updateParticles', particles);
    console.log(`particles num:\t${particles.length}`);
  });

  socket.on('updatePlayerState', (state) => {
    if (onlinePlayers[socket.id]) {
      onlinePlayers[socket.id].radius = state.radius;
      socket.broadcast.emit('updatePlayerState', { id: socket.id, state: state });
      console.log(`id:${socket.id}\t radius:${state.radius}`);
    }
  });

  socket.on('addProp', ({ prop, type, level }) => {
    console.log({ type, level });
    if (props[propId] == undefined) {
      prop.id = propId;
      prop.type = type;
      prop.level = level;
      props[propId++] = prop;
      io.emit('addProp', prop, type, level);
    }
  });

  socket.on('getProp', ({ propId, playerId, type, level }) => {
    console.log({ propId, playerId, type, level });
    if (props[propId] != undefined) {
      delete props[propId];
      socket.broadcast.emit('deleteProp', propId);
      io.emit('playerApplyBuff', playerId, type, level);
    }
  })

});



server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

console.log("server did load");
