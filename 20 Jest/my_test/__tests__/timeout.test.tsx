/*
 * @Descripttion:
 * @Author: lukasavage
 * @Date: 2022-03-11 22:36:44
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-03-11 23:09:30
 */

import { callback, promiseFun } from '../src/timeout';

describe('测试settimeout异步', () => {
	test('test settimeout', done => {
		callback((res: any) => {
			expect(res).toEqual({ code: 1 });
			done();
		});
	});
});

describe('测试promise', () => {
	it('测试异步呀', done => {
		promiseFun().then(res => {
			expect(res).toEqual('promise');
			done();
		});
	});
});
