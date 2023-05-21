
// socket connect
const socket = io();
// const socket = io('http://192.168.34.205:3000');

socket.on('connect', (stream) => {
    console.log("connect success!");
});

// socket listen on updatePlayers
const players = {};
socket.on('updatePlayers', (newPlayers) => {
    console.log(`update players`);
    for (const id in newPlayers) {
        players[id] = new Player(newPlayers[id]);
    }

    for (const id in players) {
        if (!newPlayers[id]) {
            delete players[id];
        }
    }
});

function joinGame(playerName, success) {
    if (socket.connected) {
        socket.emit("playerJoinGame", {
            name: playerName,
            score: 0,
            x: random(width),
            y: random(height),
            radius: 20,
            color: { r: random(255), g: random(255), b: random(255), a: random(200, 255) }
        }, (response) => {
            if (response == 'ok') {
                success();
            }
        });
    }
}

socket.on('playerJoinGame', (playerId, player) => {
    players[playerId] = new Player(player);
    console.log(`${player.name} join game`);
});

socket.on('removePlayer', (playerId) => {
    if (players[playerId]) {
        delete players[playerId];
        console.log(`remove player ${playerId}`);
    }
});

// socket listen on updatePlayerPos
socket.on('updatePlayerPos', (playerId, player) => {
    if (players[playerId]) {
        players[playerId].x = player.x
        players[playerId].y = player.y
    }
});

// socket listen on updateProjectile
const projectiles = [];
socket.on('updateProjectile', (newprojectiles) => {
    projectiles.splice(0);
    newprojectiles.forEach((ele) => {
        projectiles.push(new Projectile(ele));
    });
});

const particles = [];
socket.on('updateParticles', (newParticles) => {
    particles.splice(0);
    newParticles.forEach((ele) => {
        particles.push(new Particle(ele));
    });
});

socket.on('updatePlayerState', (playerState) => {
    console.log(playerState);
    if (players[playerState.id]) {
        players[playerState.id].radius = playerState.state.radius;
    }
});

// Prop
const props = [];
socket.on('addProp', (prop, type, level) => {
    console.log(`prop: ${type} ${level}`);
    const tempProp = AllPropFactory.getInstance().createProp(type,level);
    tempProp.set(prop);
    props.push(tempProp);

});
socket.on('deleteProp', (propId) => {
    const index = props.findIndex(p => p.id == propId);
    if (index != -1) {
        props.splice(index, 1);
    }
});

socket.on('updateProps',(newProps)=>{
    console.log(newProps);
    props.splice(0);
    for(const id in newProps){
        const prop = newProps[id];
        const type = prop.type;
        const level = prop.level;
        const tempProp = AllPropFactory.getInstance().createProp(type,level);
        tempProp.set(prop);
        props.push(tempProp);
    }
})


socket.on('playerApplyBuff', (playerId, type, level) => {
    const player = players[playerId];
    if (player) {
        buff = BuffFactory.getInstance().getBuff(type);
        buff.changeLevel(level);
        buff.apply(player);
    }
});


socket.on('updateRank', (rank) => {
    window.dispatchEvent(new CustomEvent("onRankUpdate", { detail: rank }));
    if (players[socket.id]) {
        window.dispatchEvent(new CustomEvent('onUpdateScore', { detail: players[socket.id].score }));
    }
})

function initWidget() {
    const joinBtn = select('#join');
    const infoPanel = select('.infoPanel');
    const inputName = select('input', infoPanel);


    joinBtn.mouseClicked(() => {
        joinBtn.attribute('disabled', true);
        joinGame(inputName.value(), () => {
            infoPanel.removeClass('show');
            infoPanel.addClass('hidden');
        });
    });

    // restart
    const restartPanel = select('.restartPanel');
    const restartBtn = select('#restart');

    restartBtn.mouseClicked(() => {
        console.log("to restart");
        restartBtn.attribute('disabled', true);
        joinGame(inputName.value(), () => {
            restartPanel.removeClass('show');
            restartPanel.addClass('hidden');
        });
    });

    window.addEventListener('onPlayerDie', (e) => {
        console.log("You are die!");
        restartBtn.removeAttribute('disabled');
        restartPanel.removeClass('hidden');
        restartPanel.addClass('show');
    })

    // rank
    const rankUl = select('ul', '.scoreBorad');
    window.addEventListener('onRankUpdate', (e) => {
        rank = e.detail;
        let tempHtml = "";
        rank.forEach((ele) => {
            tempHtml += `<li><b>${ele.name}</b>&emsp;<b>${ele.score}</b></li>`;
        })
        rankUl.html(tempHtml);
    });
}