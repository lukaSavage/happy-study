// pages/categoryDetail/index.js
import { reqGetGoodList } from '../../api/index'
import '../../tools/runtime'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cid: 0,
        // 要传给自定义组件的值
        tabData: [
            {
                id: 0,
                title: '综合',
                isActive: true
            },
            {
                id: 1,
                title: '销量',
                isActive: false
            },
            {
                id: 2,
                title: '价格',
                isActive: false
            },
        ],
        goodsList: []
    },
    myclick(e) {
        console.log(this.data.tabData, e.detail.id);
        const { tabData } = this.data;
        tabData.forEach(item => {
            item.id === e.detail.id ? item.isActive = true : item.isActive = false
        })
        // 更新数据
        this.setData({
            tabData
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            cid: options.cid
        })
        // 发送请求获取详情数据
        reqGetGoodList({}).then(res => {
            console.log(res.message.goods);
            this.setData({
                goodsList: res.message.goods
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let currentPages =  getCurrentPages();
        console.log(currentPages);
          
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

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
        console.log('触底了~');
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})