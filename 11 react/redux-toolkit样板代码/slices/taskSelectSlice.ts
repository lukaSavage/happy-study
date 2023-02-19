/*
 * @Descripttion: 用于收集下拉列表，目前包含任务项目、任务动作、应用来源
 * @Author: lukasavage
 * @Date: 2022-11-10 11:28:23
 * @LastEditors: lukasavage
 * @LastEditTime: 2023-01-05 15:09:36
 * @FilePath: \task-center-web\src\store\slices\taskSelectSlice.ts
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { listUserAuthProject } from '@/api/ext'
import { reqGetAllActionList } from '@/api/action'
import { reqGetAppCodeList } from '@/api/taskManagement'
import { authLogin } from '@/api/auth'

export interface TaskRange {
    authStatus: number
    projectId: string
    projectName: string
}

const initialState = {
    rangeList: [], // 项目(范围)动作下拉列表
    actionList: [], // 任务动作下拉列表
    sourceList: [] // 应用来源下拉列表
}

export const fetchTaskSelectList = createAsyncThunk('taskRange/fetchSelectList', async () => {
    const { loginStatus } = await authLogin()

    if (loginStatus === 'success') {
        const [rangeList, { list: actionList }, { app_info: sourceList }] = await Promise.all([
            listUserAuthProject(),
            reqGetAllActionList({ is_not_merge: 0 }),
            reqGetAppCodeList()
        ])
        return {
            rangeList,
            actionList,
            sourceList
        }
    }

    return initialState
})

export const taskRangeSlice = createSlice({
    name: 'taskSelect',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchTaskSelectList.fulfilled, (state, action: PayloadAction<any>) => {
            return action.payload
        })
    }
})

export default taskRangeSlice.reducer
