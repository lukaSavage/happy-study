/*
 * @Descripttion: 测试定时器
 * @Author: lukasavage
 * @Date: 2022-03-11 22:35:09
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-03-11 23:03:46
 */

export const callback = (onSuccess: Function) => {
	setTimeout(() => {
		onSuccess({ code: 0 });
	}, 1000);
};

export const promiseFun = () => {
    return new Promise(resolve => {
      setTimeout(() => resolve('promise'), 1500);
    })
  }