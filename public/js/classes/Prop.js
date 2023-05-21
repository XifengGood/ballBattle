// 抽象道具工厂
class PropFactory {
    createHealthProp() {
        throw new Error('Abstract method called');
    }
    createSpeedProp() {
        throw new Error('Abstract method called');
    }
    createAttackProp() {
        throw new Error('Abstract method called');
    }
    createAttackSpeedProp() {
        throw new Error('Abstract method called');
    }
    createProjectileSpeedProp() {
        throw new Error('Abstract method called');
    }
    createProjectileSizeProp() {
        throw new Error('Abstract method called');
    }
    createNullProp() {
        throw new Error('Abstract method called');
    }
}

// 具体道具工厂
class LowLevelPropFactory extends PropFactory {
    createHealthProp() {
        return new LowLevelHealthProp();
    }
    createSpeedProp() {
        return new LowLevelSpeedProp();
    }
    createAttackProp() {
        return new LowLevelAttackProp();
    }
    createAttackSpeedProp() {
        return new LowLevelAttackSpeedProp();
    }
    createProjectileSpeedProp() {
        return new LowLevelProjectileSpeedProp();
    }
    createProjectileSizeProp() {
        return new LowLevelProjectileSizeProp();
    }
    createNullProp() {
        return new NullProp();
    }
    static getInstance = (function () {
        let instance;
        if (!instance) {
            instance = new LowLevelPropFactory();
        }
        return instance;
    })
}
// 具体道具工厂
class MediumLevelPropFactory extends PropFactory {
    createHealthProp() {
        return new MediumLevelHealthProp();
    }
    createSpeedProp() {
        return new MediumLevelSpeedProp();
    }
    createAttackProp() {
        return new MediumLevelAttackProp();
    }
    createAttackSpeedProp() {
        return new MediumLevelAttackSpeedProp();
    }
    createProjectileSpeedProp() {
        return new MediumLevelProjectileSpeedProp();
    }
    createProjectileSizeProp() {
        return new MediumLevelProjectileSizeProp();
    }
    createNullProp() {
        return new NullProp();
    }
    static getInstance = (function () {
        let instance;
        if (!instance) {
            instance = new MediumLevelPropFactory();
        }
        return instance;
    })
}
// 具体道具工厂
class HighLevelPropFactory extends PropFactory {
    createHealthProp() {
        return new HighLevelHealthProp();
    }
    createSpeedProp() {
        return new HighLevelSpeedProp();
    }
    createAttackProp() {
        return new HighLevelAttackProp();
    }
    createAttackSpeedProp() {
        return new HighLevelAttackSpeedProp();
    }
    createProjectileSpeedProp() {
        return new HighLevelProjectileSpeedProp();
    }
    createProjectileSizeProp() {
        return new HighLevelProjectileSizeProp();
    }
    createNullProp() {
        return new NullProp();
    }
    static getInstance = (function () {
        let instance;
        if (!instance) {
            instance = new HighLevelPropFactory();
        }
        return instance;
    })
}


// 抽象道具类
class Prop {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.radius = 20;
        this.color = { r: random(255), g: random(255), b: random(255), a: random(200, 255) };
    }

    set({ x, y, radius, color, id }) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.id = id;
    }

    draw() {
        push();
        strokeWeight(this.radius * 2);
        stroke(color(this.color.r, this.color.g, this.color.b, this.color.a));
        point(this.x, this.y);
        pop();
    }
    update() {
        this.draw();
    }

    use(player) {
        throw new Error('Abstract method called');
    }
}

// 具体道具类
class HealthProp extends Prop { }
class SpeedProp extends Prop { }
class AttackProp extends Prop { }
class AttackSpeedProp extends Prop { }
class ProjectileSpeedProp extends Prop { }
class ProjectileSizeProp extends Prop { }
class NullProp extends Prop {
    use(player) {
        console.log('Null Prop used');
    }
}

// 具体道具类
class LowLevelHealthProp extends HealthProp {
    use(player) {
        console.log('Low Level Health Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'health', level: 'low' });
        }
    }
}

// 具体道具类
class MediumLevelHealthProp extends HealthProp {
    use(player) {
        console.log('Medium Level Health Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'health', level: 'medium' });
        }
    }
}

// 具体道具类
class HighLevelHealthProp extends HealthProp {
    use(player) {
        console.log('High Level Health Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'health', level: 'high' });
        }
    }
}

// 具体道具类
class LowLevelSpeedProp extends SpeedProp {
    use(player) {
        console.log('Low Level Speed Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'speed', level: 'low' });
        }
    }
}

// 具体道具类
class MediumLevelSpeedProp extends SpeedProp {
    use(player) {
        console.log('Medium Level Speed Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'speed', level: 'medium' });
        }
    }
}

// 具体道具类
class HighLevelSpeedProp extends SpeedProp {
    use(player) {
        console.log('High Level Speed Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'speed', level: 'high' });
        }
    }
}

// 具体道具类
class LowLevelAttackProp extends AttackProp {
    use(player) {
        console.log('Low Level Attack Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'attack', level: 'low' });
        }
    }
}

// 具体道具类
class MediumLevelAttackProp extends AttackProp {
    use(player) {
        console.log('Medium Level Attack Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'attack', level: 'medium' });
        }
    }
}

// 具体道具类
class HighLevelAttackProp extends AttackProp {
    use(player) {
        console.log('High Level Attack Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'attack', level: 'high' });
        }
    }
}

// 具体道具类
class LowLevelAttackSpeedProp extends AttackSpeedProp {
    use(player) {
        console.log('Low Level Attack Speed Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'attackSpeed', level: 'low' });
        }
    }
}

// 具体道具类
class MediumLevelAttackSpeedProp extends AttackSpeedProp {
    use(player) {
        console.log('Medium Level Attack Speed Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'attackSpeed', level: 'medium' });
        }
    }
}

// 具体道具类
class HighLevelAttackSpeedProp extends AttackSpeedProp {
    use(player) {
        console.log('High Level Attack Speed Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'attackSpeed', level: 'high' });
        }
    }
}

// 具体道具类
class LowLevelProjectileSpeedProp extends ProjectileSpeedProp {
    use(player) {
        console.log('Low Level Projectile Speed Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'projectileSpeed', level: 'low' });
        }
    }
}

// 具体道具类
class MediumLevelProjectileSpeedProp extends ProjectileSpeedProp {
    use(player) {
        console.log('Medium Level Projectile Speed Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'projectileSpeed', level: 'medium' });
        }
    }
}

// 具体道具类
class HighLevelProjectileSpeedProp extends ProjectileSpeedProp {
    use(player) {
        console.log('High Level Projectile Speed Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'projectileSpeed', level: 'high' });
        }
    }
}

// 具体道具类
class LowLevelProjectileSizeProp extends ProjectileSizeProp {
    use(player) {
        console.log('Low Level Projectile Size Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'projectileSize', level: 'low' });
        }
    }
}

// 具体道具类
class MediumLevelProjectileSizeProp extends ProjectileSizeProp {
    use(player) {
        console.log('Medium Level Projectile Size Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'projectileSize', level: 'medium' });
        }
    }
}

// 具体道具类
class HighLevelProjectileSizeProp extends ProjectileSizeProp {
    use(player) {
        console.log('High Level Projectile Size Prop used');
        if (socket) {
            socket.emit('getProp', { propId: this.id, playerId: player.getId(), type: 'projectileSize', level: 'high' });
        }
    }
}

class AllPropFactory {
    createProp(type, level) {
        let propFactory;
        switch (level) {
            case 'low': propFactory = LowLevelPropFactory.getInstance(); break;
            case 'medium': propFactory = MediumLevelPropFactory.getInstance(); break;
            case 'high': propFactory = HighLevelPropFactory.getInstance(); break;
        }
        let prop;
        switch (type) {
            case 'health':
                prop = propFactory.createHealthProp(); break;
            case 'speed':
                prop = propFactory.createSpeedProp(); break;
            case 'attack':
                prop = propFactory.createAttackProp(); break;
            case 'attackSpeed':
                prop = propFactory.createAttackSpeedProp(); break;
            case 'projectileSpeed':
                prop = propFactory.createProjectileSpeedProp(); break;
            case 'projectileSize':
                prop = propFactory.createProjectileSizeProp(); break;
            default:
                prop = propFactory.createNullProp(); break;
        }
        return prop;
    }

    static getInstance = (function () {
        let instance;
        if (!instance) {
            instance = new AllPropFactory();
        }
        return instance;
    })
}

class Game {
    constructor() {
        this.propFactory = LowLevelPropFactory.getInstance();
        this.level = 'low';
        this.type = 'health';
        window.addEventListener('onUpdateScore', (e) => {
            const score = e.detail;
            if (score > 10) {
                this.propFactory = HighLevelPropFactory.getInstance(); this.level = 'high';
            } else if (score > 5) {
                this.propFactory = MediumLevelPropFactory.getInstance(); this.level = 'medium';
            }
            console.log(`score: ${score}  level:${this.level}`);
        })

        this.index = 0;
        this.propType = {
            0: 'health',
            1: 'speed',
            2: 'attack',
            3: 'attackSpeed',
            4: 'projectileSpeed',
            5: 'projectileSize'
        }
    }
    async createProp() {
        let prop;
        switch (this.type) {
            case 'health':
                prop = this.propFactory.createHealthProp(); break;
            case 'speed':
                prop = this.propFactory.createSpeedProp(); break;
            case 'attack':
                prop = this.propFactory.createAttackProp(); break;
            case 'attackSpeed':
                prop = this.propFactory.createAttackSpeedProp(); break;
            case 'projectileSpeed':
                prop = this.propFactory.createProjectileSpeedProp(); break;
            case 'projectileSize':
                prop = this.propFactory.createProjectileSizeProp(); break;
            default:
                prop = this.propFactory.createNullProp(); break;
        }
        socket.emit('addProp', { prop: prop, type: this.type, level: this.level });

        this.type = this.propType[(++this.index) % Object.keys(this.propType).length];

        await waitforme(8000);
        this.createProp();
    }
}