let ajaxCount = 0;
const ajax = (params)=>{
    // 设置loading
    ajaxCount++;
    wx.showLoading({
        title: '加载中...',
        mask: true
    });
      
    // 配置公共的请求路径
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject)=>{
        uni.request({
            ...params,
            url: baseUrl + params.url,
            success: (res)=>{
                console.log(res);
                resolve(res.data);
            },
            fail: (err)=> {
                reject(err)
                throw Error(err)
            },
            complete: ()=>{
                ajaxCount--;
                if(ajaxCount === 0) {
                    wx.hideLoading();
                }
            }
        })
    })
}
export default ajax;