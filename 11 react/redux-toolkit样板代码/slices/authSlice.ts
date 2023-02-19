/*
 * @Descripttion: 用于收集下拉列表，目前包含任务项目、任务动作、应用来源
 * @Author: lukasavage
 * @Date: 2022-11-10 11:28:23
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-11-14 17:14:31
 * @FilePath: \task-center-web\src\store\slices\authSlice.ts
 */
import { authLogin } from '@/api/auth'
import { getWxAuthProjects, getWxAuthSituation, getWxValidToken } from '@/api/ext'
import { reqGetAssociatedStaff } from '@/api/staff'
import { get } from '@/utils/http'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type IWxAuthProjectList = Array<{ project_id: string; project_name: string }> | null

const initialState = {
    /** 登入状态 loading | success | error */
    loginStatus: 'loading',
    isGuest: true,
    userName: '',
    userCode: '',
    userGuid: '',
    buGuid: '',
    orgName: '',
    orgCode: '',
    orgLogo: '',
    tokenName: '',
    isAdmin: false,
    privatization: { privatization: false, appcode: [] },
    bindWeixin: false,
    isGraySubject: false,
    staff_id: void 0,
    /** 企微授权信息 */
    wx_auth_list: null,
    /** 打开企微配置弹窗可用的运营主体 */
    wx_valid_token: null,
    wx_valid_token_has_err: true,
    /** 企微云客多授权项目列表  */
    wx_auth_project_list: null as IWxAuthProjectList
}

/** 获取授权信息 */
export const fetchAuthInfo = createAsyncThunk('auth/fetchAuthInfo', async () => {
    const { loginStatus } = await authLogin()

    if (loginStatus === 'success') {
        const authInfo = await get(`${location.origin}/api/index.php?r=site/login-data`)
        return { ...authInfo, loginStatus }
    } else {
        return { loginStatus }
    }
})

/** 获取 staff_id */
export const fetchStaffId = createAsyncThunk('auth/fetchStaffId', async (app_account_id: string) => {
    const { staff_id } = await reqGetAssociatedStaff({
        app_id: '72469eee-4d98-11ea-b3f1-00155d02c83e',
        app_account_id
    })
    return staff_id
})

/** 获取企微云客多授权信息 */
export const fetchWxAuthSituation = createAsyncThunk('auth/fetchWxAuthSituation', async () => {
    const list = await getWxAuthSituation()
    return list
})

/** 获取打开企微配置弹窗可用的运营主体 */
export const fetchWxValidToken = createAsyncThunk('auth/fetchWxValidToken', async () => {
    const token = await getWxValidToken()
    return token
})

/** 获取企微云客多授权的项目列表（聚合所有运营主体下绑定的项目） */
export const fetchWxAuthProjects = createAsyncThunk('auth/fetchWxAuthProjects', async () => {
    const list = await getWxAuthProjects()
    return list
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAuthInfo.fulfilled, (state, action: PayloadAction<any>) => {
                return { ...state, ...action.payload }
            })
            .addCase(fetchStaffId.fulfilled, (state, action) => {
                return { ...state, staff_id: action.payload }
            })
            .addCase(fetchWxAuthSituation.fulfilled, (state, action) => {
                return { ...state, wx_auth_list: action.payload }
            })
            .addCase(fetchWxValidToken.fulfilled, (state, action) => {
                const token = action.payload
                const isEmpty = token == ''
                return { ...state, wx_valid_token: token, wx_valid_token_has_err: isEmpty }
            })
            .addCase(fetchWxAuthProjects.fulfilled, (state, action) => {
                const list = action.payload
                return { ...state, wx_auth_project_list: list as IWxAuthProjectList }
            })
    }
})

export default authSlice.reducer
