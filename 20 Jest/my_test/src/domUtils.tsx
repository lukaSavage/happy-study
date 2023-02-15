/*
 * @Descripttion: jest测试dom
 * @Author: lukasavage
 * @Date: 2022-03-09 17:13:41
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-03-09 17:13:41
 */

export function remove(node) {
	node.parentNode.removeChild(node);
}
export function on(node, type, handler) {
	node.addEventListener(type, handler);
}
