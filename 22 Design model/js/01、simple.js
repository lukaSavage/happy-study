"use strict";
/*
 * @Descripttion: 工厂模式 - 简单工厂
 * @Author: lukasavage
 * @Date: 2022-06-29 22:25:54
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-06-29 22:27:01
 * @FilePath: \design-model\04、factory\01、simple.ts
 */
class Coffee {
    constructor(name) {
        this.name = name;
    }
}
class AmericanoCoffee extends Coffee {
    constructor(name) {
        super(name);
        this.name = name;
    }
}
class LatteCoffee extends Coffee {
    constructor(name) {
        super(name);
        this.name = name;
    }
}
class CappuccinoCoffee extends Coffee {
    constructor(name) {
        super(name);
        this.name = name;
    }
}
class Café {
    static order(name) {
        switch (name) {
            case 'Americano':
                return new AmericanoCoffee('美式咖啡');
            case 'Latte':
                return new LatteCoffee('拿铁咖啡');
            case 'Cappuccino':
                return new LatteCoffee('卡布奇诺');
            default:
                return null;
        }
    }
}
console.log(Café.order('Americano'));
console.log(Café.order('Latte'));
console.log(Café.order('Cappuccino'));
