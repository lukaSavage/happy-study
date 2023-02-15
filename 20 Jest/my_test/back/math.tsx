/*
 * @Descripttion:
 * @Author: lukasavage
 * @Date: 2022-03-08 21:22:17
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-03-11 22:47:55
 */
let { add, minus, multiply, divide } = require('./math');
describe('测试add', function () {
	test('测试1+1', function () {
		expect(add(1, 1)).toBe(2);
	});
	test('测试2+2', function () {
		expect(add(2, 2)).toBe(4);
	});
});
describe('测试minus', function () {
	test('测试1-1', function () {
		expect(minus(1, 1)).toBe(0);
	});
	test('测试2-2', function () {
		expect(minus(2, 2)).toBe(0);
	});
});
