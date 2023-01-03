import ajax from './ajax'

/**
 * 首页
 */
// 1.获取轮播图接口
export const reqGetSwiper = () => ajax({
    url: '/home/swiperdata',
    method: 'GET'
})
// 2.获取导航栏数据
export const reqGetNavData = () => ajax({
    url: '/home/catitems',
    method: 'GET'
})
// 3.获取楼层数据
export const reqGetHomeGroup = () => ajax({
    url: '/home/floordata',
    method: 'GET'
})
/**
 * 分类页面
 */
// 1.分类数据
export const reqGetCategory = () => ajax({
    url: '/categories',
    method: 'GET'
})
// 2.分类  -->  商品列表
export const reqGetGoodList = ({ query = '', cid = '', pagenum = 1, pagesize = 10 }) => ajax({
    url: '/goods/search',
    methods: 'GET',
    data: {
        query,
        cid,
        pagenum,
        pagesize
    }
})

