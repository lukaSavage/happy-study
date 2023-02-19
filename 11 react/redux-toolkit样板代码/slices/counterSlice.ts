/*
 * @Descripttion: demo文件，用于演示
 * @Author: lukasavage
 * @Date: 2022-10-21 14:21:13
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-10-21 14:21:20
 * @FilePath: \task-center-web\src\store\slice\counterSlice.ts
 */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
	value: number
}

const initialState: CounterState = {
	value: 0
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: state => {
			state.value += 1
		},
		decrement: state => {
			state.value -= 1
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		}
	}
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
