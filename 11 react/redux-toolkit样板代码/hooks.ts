/*
 * @Descripttion: 对redux的hooks做一层类型推断
 * @Author: lukasavage
 * @Date: 2022-11-09 11:09:40
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-11-09 11:24:41
 * @FilePath: \task-center-web\src\store\hooks.ts
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
