// 享元工厂
class FlyweightFactory {
    constructor() {
        this.flyweights = {};
    }

    getFlyweight(key) {
        if (!this.flyweights[key]) {
            this.flyweights[key] = new ConcreteFlyweight(key);
        }
        return this.flyweights[key];
    }

    getFlyweightsCount() {
        return Object.keys(this.flyweights).length;
    }
}

// 享元基类
class Flyweight {
    constructor(key) {
        this.key = key;
    }

    operation(extrinsicState) {
        throw new Error('Abstract method called');
    }
}

// 具体享元类
class ConcreteFlyweight extends Flyweight {
    operation(extrinsicState) {
        console.log(`Concrete Flyweight with key ${this.key} and extrinsic state ${extrinsicState}`);
    }
}

// 客户端
class Client {
    constructor() {
        this.flyweightFactory = new FlyweightFactory();
    }

    run() {
        const flyweight1 = this.flyweightFactory.getFlyweight('key1');
        flyweight1.operation('state1');

        const flyweight2 = this.flyweightFactory.getFlyweight('key2');
        flyweight2.operation('state2');

        const flyweight3 = this.flyweightFactory.getFlyweight('key1');
        flyweight3.operation('state3');

        console.log(`Total flyweights created: ${this.flyweightFactory.getFlyweightsCount()}`);
    }
}

// 使用享元模式
const client = new Client();
client.run();
