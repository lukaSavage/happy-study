import { reqGetSwiper, reqGetNavData, reqGetHomeGroup } from '../../api/index'

// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
        navList: [],
        groupList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onload页面加载----');
        // 获取轮播图数据
        reqGetSwiper().then(res => {
            this.setData({
                swiperList: res.message
            })
        })
        // 获取导航栏数据
        reqGetNavData().then(res => {
            this.setData({
                navList: res.message
            })
        })
        // 获取楼层的数据
        reqGetHomeGroup().then(res=>{
            this.setData({
                groupList: res.message
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log('onReady...');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('onShow...');
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log('onHide---');
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log('onUnload...');
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})