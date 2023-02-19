/*
 * @Descripttion:
 * @Author: lukasavage
 * @Date: 2022-11-18 17:37:19
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-11-29 17:45:19
 * @FilePath: \task-center-web\src\store\slices\subjectsSlice.ts
 */
import { get } from '@/utils/http'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/** 获取授权信息 */
export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async () => {
    const { subjects } = await get(`${location.origin}/v1-bff-yk-back/subject/list?isAdmin=true`)
    return subjects.map(({ subjectId, subjectName, isEnable }) => {
        return { subjectId, subjectName, isEnable }
    })
})

export const subjectsSlice = createSlice({
    name: 'subjects',
    initialState: {
        loading: false,
        subjects: []
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchSubjects.pending, (state, action: PayloadAction<any>) => {
            state.loading = true
        })
        builder.addCase(fetchSubjects.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.subjects = action.payload
        })
        builder.addCase(fetchSubjects.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
        })
    }
})

export default subjectsSlice.reducer
