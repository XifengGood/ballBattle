// Buff工厂
class BuffFactory {
    constructor() {
        this.buffs = {};
    }

    static getInstance = (function () {
        let instance;
        if (!instance) {
            instance = new BuffFactory();
        }
        return instance;
    })

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
                case 'attackSpeed':
                    this.buffs[type] = new AttackSpeedBuff();
                    break;
                case 'projectileSpeed':
                    this.buffs[type] = new ProjectileSpeedBuff();
                    break;
                case 'projectileSize':
                    this.buffs[type] = new ProjectileSizeBuff();
                    break;
                default:
                    this.buffs[type] = new NullBuff();
            }
        }
        return this.buffs[type];
    }

    getBuffsCount() {
        return Object.keys(this.buffs).length;
    }
}

// Buff抽象类
class AbstactBuff {
    apply(player) {
        throw new Error('Abstract method called');
    }
}

// Buff基类
class BuffBase extends AbstactBuff {
    constructor() {
        super();
        this.level = 1;
    }
    apply(player) {
        console.log(`Applying No Buff for player ${player.name}`);
    }
    changeLevel(level) {
        this.level = level;
    }
}

// 具体Buff类 - 加血buff
class NullBuff extends BuffBase {
    apply(player) {
        console.log(`Null Buff for player ${player.name}`);
    }
}

// 具体Buff类 - 加血buff
class HealthBuff extends BuffBase {
    apply(player) {
        console.log(`Applying Health Buff for player ${player.name}`);
        switch (this.level) {
            case 'low':
                player.addBlood({ hp: 10 });
                break;
            case 'medium':
                player.addBlood({ hp: 20 });
                break;
            case 'high':
                player.addBlood({ hp: 30 });
                break;
            default:
                throw new Error('Invalid buff level');
        }
    }
}

// 具体Buff类 - 加速buff
class SpeedBuff extends BuffBase {
    apply(player) {
        console.log(`Applying Speed Buff for player ${player.name}`);
        switch (this.level) {
            case 'low':
                player.addSpeedTemp({ speed: 10, duration: 15000 });
                break;
            case 'medium':
                player.addSpeedTemp({ speed: 20, duration: 15000 });
                break;
            case 'high':
                player.addSpeedTemp({ speed: 40, duration: 20000 });
                break;
            default:
                throw new Error('Invalid buff level');
        }
    }
}

// 具体Buff类 - 加攻击力buff
class AttackBuff extends BuffBase {
    apply(player) {
        console.log(`Applying Attack Buff for player ${player.name}`);
        switch (this.level) {
            case 'low':
                player.addAttackTemp({ attack: 20, duration: 5000 });
                break;
            case 'medium':
                player.addAttackTemp({ attack: 30, duration: 5000 });
                break;
            case 'high':
                player.addAttackTemp({ attack: 40, duration: 10000 });
                break;
            default:
                throw new Error('Invalid buff level');
        }
    }
}

// 具体Buff类 - 加攻速buff
class AttackSpeedBuff extends BuffBase {
    apply(player) {
        console.log(`Applying Attack Speed Buff for player ${player.name}`);
        switch (this.level) {
            case 'low':
                player.addAttackSpeedTemp({ attackSpeed: 1, duration: 5000 });
                break;
            case 'medium':
                player.addAttackSpeedTemp({ attackSpeed: 2, duration: 5000 });
                break;
            case 'high':
                player.addAttackSpeedTemp({ attackSpeed: 3, duration: 5000 });
                break;
            default:
                throw new Error('Invalid buff level');
        }
    }
}

// 具体Buff类 - 加子弹速度buff
class ProjectileSpeedBuff extends BuffBase {
    apply(player) {
        console.log(`Applying Projectile Speed Buff for player ${player.name}`);
        switch (this.level) {
            case 'low':
                player.addProjectileSpeedTemp({ speed: 20, duration: 5000 });
                break;
            case 'medium':
                player.addProjectileSpeedTemp({ speed: 30, duration: 5000 });
                break;
            case 'high':
                player.addProjectileSpeedTemp({ speed: 50, duration: 5000 });
                break;
            default:
                throw new Error('Invalid buff level');
        }
    }
}

// 具体Buff类 - 加子弹大小buff
class ProjectileSizeBuff extends BuffBase {
    apply(player) {
        console.log(`Applying Projectile Size Buff for player ${player.name}`);
        switch (this.level) {
            case 'low':
                player.addProjectileSizeTemp({ size: 20, duration: 5000 });
                break;
            case 'medium':
                player.addProjectileSizeTemp({ size: 30, duration: 5000 });
                break;
            case 'high':
                player.addProjectileSizeTemp({ size: 40, duration: 5000 });
                break;
            default:
                throw new Error('Invalid buff level');
        }
    }
}