import { reqGetCategory } from '../../api/index'
import '../../tools/runtime'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryAllList: [],
        currentCheck: '',
        rightArr: [],
        scrollTop: 0
    },
    // 事件汇总---------------------------
    handleNav(e) {
        console.log(e);
        const { item } = e.currentTarget.dataset;
        this.setData({
            currentCheck: item.cat_name,
            rightArr: item.children,
            scrollTop: 0
        })
    },
    // ---------------------------
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad (options) {
        // 使用本地存储技术
        const cateList = wx.getStorageSync('cate');
        if (!cateList) {
            // reqGetCategory().then(res => {
            //     // 把接口数据缓存起来
            //     wx.setStorageSync('cate',{time: Date.now(), data: res.message})
            //     this.setData({
            //         categoryAllList: res.message,
            //         currentCheck: res.message[0].cat_name,
            //         rightArr: res.message[0].children
            //     })
            // })
            const res = await reqGetCategory();
                wx.setStorageSync('cate',{time: Date.now(), data: res.message})
                this.setData({
                    categoryAllList: res.message,
                    currentCheck: res.message[0].cat_name,
                    rightArr: res.message[0].children
                })
        } else {
            // 说明本地有数据，再次判断数据是否过期
            if((Date.now() - cateList.time) > 1000*5){
                console.log('进来了');
                reqGetCategory().then(res => {
                    // 把接口数据缓存起来
                    wx.setStorageSync('cate',{time: Date.now(), data: res.message})
                    this.setData({
                        categoryAllList: res.message,
                        currentCheck: res.message[0].cat_name,
                        rightArr: res.message[0].children
                    })
                })
            } else {
                this.setData({
                    categoryAllList: cateList.data,
                    currentCheck: cateList.data[0].cat_name,
                    rightArr: cateList.data[0].children
                })
            }
        }


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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})