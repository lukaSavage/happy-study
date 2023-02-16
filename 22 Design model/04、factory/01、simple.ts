/*
 * @Descripttion: 工厂模式 - 简单工厂
 * @Author: lukasavage
 * @Date: 2022-06-29 22:25:54
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-06-29 22:29:50
 * @FilePath: \design-model\04、factory\01、simple.ts
 */

abstract class Coffee {
	constructor(public name: string) {}
}
class AmericanoCoffee extends Coffee {
	constructor(public name: string) {
		super(name);
	}
}
class LatteCoffee extends Coffee {
	constructor(public name: string) {
		super(name);
	}
}
class CappuccinoCoffee extends Coffee {
	constructor(public name: string) {
		super(name);
	}
}

class Café {
	static order(name: string) {
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
