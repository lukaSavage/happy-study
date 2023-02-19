/*
 * @Descripttion: redux的入口文件
 * @Author: lukasavage
 * @Date: 2022-10-21 14:02:37
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-11-09 11:24:20
 * @FilePath: \task-center-web\src\store\index.ts
 */

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

const store = configureStore({
	reducer: rootReducer
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch