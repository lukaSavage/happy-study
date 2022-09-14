let Article = require('./model/article');
let User = require('./model/user');
const mongoose =require('mongoose');


// 创建关联
(async()=>{
    // let user = await User.create({username:'jw',password:'jw',gender:1});
    // let article = await Article.create({title:'mongo课程',content:'今天各种报错',user_id:user._id});

    // 根据文章的id如何查找用户?
    // let article = await Article.findById('60f190b08f14152a3c26a0cf',{title:1}).populate('user_id',{hobby:1,gender:1,_id:0}); // _id 特殊

    // // 0 表示 不显示 其他的显示  1表示显示 其他的不显示
    // // let user = await User.findOne({_id: article.user_id})

    // // populate
    // console.log(article)

    // 这个是原生的mongo方法
    // let articles = await Article.aggregate([ // pipeline 管道一个个来过滤
    //     {
    //         $project:{
    //             createdAt:0,
    //             updatedAt:0
    //         }
    //     },
    //     {
    //         $lookup:{
    //             from:'user',
    //             localField:'user_id',
    //             foreignField:'_id',
    //             as:'user'
    //         }
    //     },
    //     {
    //         $match:{
    //             _id: mongoose.Types.ObjectId('60f190b08f14152a3c26a0cf')
    //         }
    //     }
    // ]);

    let users = await User.aggregate([ // pipeline 管道一个个来过滤
        // {
        //     $project:{
               
        //     }
        // },
        // { // 我想找某一类的人
        //     $lookup:{
        //         from:'user',
        //         localField:'user_id',
        //         foreignField:'_id',
        //         as:'user'
        //     }
        // },
        {
            $group:{ // 查出来的结果叫name
                _id:"$username",age:{$sum:'$age'}
            }
        },
        {
            $match:{
               _id:"zf"
            }
        }
    ]);
    console.log(users)
    mongoose.disconnect();
})();



07-18 Vue3开发环境搭建，Vue3 compositionAPI的使用，手写Vue3响应式模块原理 （monorepo环境搭建，rolllup环境打包项目） 
07-21 Vue3响应式源码分析及代码调试 
07-23 手写Vue3初始化流程实现、虚拟DOM实现 
07-25 Vue3中组件实现原理，手写Vue3diff算法实现 watchApi 异步渲染 、生命周期实现 
07-28 vue3中模板编译原理，template编译render函数原理 
07-30 手写模板编译 transform 核心逻辑，及codegen原理 
08-01 Vue3生态源码剖析 Vuex实现原理 
08-04 Vue3路由实现原理 
08-06 Vue3路由实现原理 
08-08 ts课程：类、接口、泛型、兼容性、条件、类型保护、声明文件.....等 
08-11 vite开发环境搭建及原理剖析 
08-13 vite开发环境搭建及原理剖析 
08-15 Vue3 +TS编写组件库，编写常用组件 
08-18 组件库的讲解 
08-20 组件库的讲解 
