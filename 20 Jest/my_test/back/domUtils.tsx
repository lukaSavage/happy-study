/*
 * @Descripttion: 测试src/domUtils.tsx文件，注意要同名！
 * @Author: lukasavage
 * @Date: 2022-03-09 17:14:46
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-03-11 22:44:27
 */

// import { remove, on } from '../src/domUtils';
// declare var describe: (arg0: string, arg1: () => void) => void;
// declare var test: (arg0: string, arg1: { (): void; (): void }) => void;
// declare var expect: (arg0: string | HTMLElement | null) => {
// 	(): any;
// 	new (): any;
// 	toBe: { (arg0: string): void; new (): any };
// 	toBeNull: { (): void; new (): any };
// };
// describe('domUtils', () => {
// 	test('remove', function () {
// 		document.body.innerHTML = `
//             <div id="parent">
//               <div id="child">儿子</div>
//             </div>
//             `;
// 		let parent = document.getElementById('parent');
// 		expect(parent!.nodeName.toLocaleLowerCase()).toBe('div');
// 		const child = document.getElementById('child');
// 		expect(child!.nodeName.toLocaleLowerCase()).toBe('div');
// 		remove(child);
// 		expect(document.getElementById('child')).toBeNull();
// 	});
// 	test('on', function () {
// 		document.body.innerHTML =
// 			'<div id="container"><button id="clickMe">click</button></div>';
// 		let clickMe = document.getElementById('clickMe');
// 		on(clickMe, 'click', () => {
// 			clickMe.innerHTML = 'clicked';
// 		});
// 		clickMe.click();
// 		expect(clickMe.innerHTML).toBe('clicked');
// 	});
// });
