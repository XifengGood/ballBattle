// 抽象道具工厂
class ItemFactory {
    createItem(level) {
        throw new Error('Abstract method called');
    }
}

// 具体道具工厂
class HealthItemFactory extends PropFactory {
    createItem(level) {
        switch (level) {
            case 'low':
                return new LowLevelHealthProp();
            case 'medium':
                return new MediumLevelHealthProp();
            case 'high':
                return new HighLevelHealthProp();
            default:
                throw new Error('Invalid level');
        }
    }
}

// 具体道具工厂
class SpeedItemFactory extends PropFactory {
    createItem(level) {
        switch (level) {
            case 'low':
                return new LowLevelSpeedItem();
            case 'medium':
                return new MediumLevelSpeedItem();
            case 'high':
                return new HighLevelSpeedItem();
            default:
                throw new Error('Invalid level');
        }
    }
}

// 具体道具工厂
class AttackItemFactory extends PropFactory {
    createItem(level) {
        switch (level) {
            case 'low':
                return new LowLevelAttackItem();
            case 'medium':
                return new MediumLevelAttackItem();
            case 'high':
                return new HighLevelAttackItem();
            default:
                throw new Error('Invalid level');
        }
    }
}

// 抽象道具类
class Item {
    use() {
        throw new Error('Abstract method called');
    }
}

// 具体道具类
class LowLevelHealthItem extends Prop {
    use() {
        console.log('Low Level Health Item used');
    }
}

// 具体道具类
class MediumLevelHealthItem extends Prop {
    use() {
        console.log('Medium Level Health Item used');
    }
}

// 具体道具类
class HighLevelHealthItem extends Prop {
    use() {
        console.log('High Level Health Item used');
    }
}

// 具体道具类
class LowLevelSpeedItem extends Prop {
    use() {
        console.log('Low Level Speed Item used');
    }
}

// 具体道具类
class MediumLevelSpeedItem extends Prop {
    use() {
        console.log('Medium Level Speed Item used');
    }
}

// 具体道具类
class HighLevelSpeedItem extends Prop {
    use() {
        console.log('High Level Speed Item used');
    }
}

// 具体道具类
class LowLevelAttackItem extends Prop {
    use() {
        console.log('Low Level Attack Item used');
    }
}

// 具体道具类
class MediumLevelAttackItem extends Prop {
    use() {
        console.log('Medium Level Attack Item used');
    }
}

// 具体道具类
class HighLevelAttackItem extends Prop {
    use() {
        console.log('High Level Attack Item used');
    }
}

// 使用抽象工厂创建道具
const healthFactory = new HealthPropFactory();
const lowLevelHealthItem = healthFactory.createItem('low');
lowLevelHealthItem.use();

const speedFactory = new SpeedPropFactory();
const mediumLevelSpeedItem = speedFactory.createItem('medium');
mediumLevelSpeedItem.use();

const attackFactory = new AttackPropFactory();
const highLevelAttackItem = attackFactory.createItem('high');
highLevelAttackItem.use();
