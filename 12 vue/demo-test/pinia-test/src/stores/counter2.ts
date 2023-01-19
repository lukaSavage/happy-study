import { defineStore } from 'pinia';

export const useStrStore = defineStore({
	// vuex 在前端用是对象 在ssr中是函数
	// vue data:{} data:()=>{}
	id: 'counter2',
	state: () => {
		return {
			count: 0,
			currentStr: '我是张三',
		};
	},
	getters: {
		double(): number {
			return this.count * 2;
		},
	},
	actions: {
		increment2(payload: number) {
			this.count += payload;
			this.currentStr = '我是李四';
		},
	},
});
