// Buff工厂
class BuffFactory {
    constructor() {
        this.buffs = {};
    }

    getBuff(type) {
        if (!this.buffs[type]) {
            switch (type) {
                case 'health':
                    this.buffs[type] = new HealthBuff();
                    break;
                case 'speed':
                    this.buffs[type] = new SpeedBuff();
                    break;
                case 'attack':
                    this.buffs[type] = new AttackBuff();
                    break;
                default:
                    throw new Error('Invalid buff type');
            }
        }
        return this.buffs[type];
    }

    getBuffsCount() {
        return Object.keys(this.buffs).length;
    }
}

// Buff基类
class Buff {
    apply(player) {
        throw new Error('Abstract method called');
    }
}

// 具体Buff类 - 加血buff
class HealthBuff extends Buff {
    apply(player) {
        console.log(`Applying Health Buff for player ${player.name}`);
        // 实际应用加血buff的逻辑
    }
}

// 具体Buff类 - 加速buff
class SpeedBuff extends Buff {
    apply(player) {
        console.log(`Applying Speed Buff for player ${player.name}`);
        // 实际应用加速buff的逻辑
    }
}

// 具体Buff类 - 加攻击力buff
class AttackBuff extends Buff {
    apply(player) {
        console.log(`Applying Attack Buff for player ${player.name}`);
        // 实际应用加攻击力buff的逻辑
    }
}

// 玩家类
class Player {
    constructor(name) {
        this.name = name;
        this.buffs = [];
    }

    addBuff(buff) {
        this.buffs.push(buff);
    }

    applyBuffs() {
        for (const buff of this.buffs) {
            buff.apply(this);
        }
    }
}

// 使用享元模式设计Buff工厂
const buffFactory = new BuffFactory();

// 创建玩家
const player1 = new Player('Player 1');
const player2 = new Player('Player 2');

// 获取共享的Buff对象并添加到玩家
const healthBuff = buffFactory.getBuff('health');
player1.addBuff(healthBuff);
player2.addBuff(healthBuff);

const speedBuff = buffFactory.getBuff('speed');
player1.addBuff(speedBuff);
player2.addBuff(speedBuff);

const attackBuff = buffFactory.getBuff('attack');
player1.addBuff(attackBuff);

// 应用Buff
player1.applyBuffs();
player2.applyBuffs();

// 显示Buff数量
console.log(`Total buffs created: ${buffFactory.getBuffsCount()}`);
