/*
 * @Descripttion: reducer的入口文件
 * @Author: lukasavage
 * @Date: 2022-10-21 14:17:31
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-11-22 17:04:36
 * @FilePath: \task-center-web\src\store\rootReducer.ts
 */

import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import counterSlice from './slices/counterSlice'
import taskSelectSlice from './slices/taskSelectSlice'
import subjectsSlice from './slices/subjectsSlice'

const modules = {
    counterSlice,
    taskSelectSlice,
    authSlice,
    subjectsSlice
}

const rootReducer = combineReducers(modules)

export type TypeRootReducer = ReturnType<typeof rootReducer>

export default rootReducer
