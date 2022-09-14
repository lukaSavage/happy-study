<!--
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-10-26 20:23:03
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-12-05 15:34:29
-->

# 1、connect-react-router的使用

``` js
/*
    ·介绍
        connected-react-router主要作用是可以把我们的redux仓库和路由连接在一起使用，具体主要有两个用途
            1)可以通过向仓库派发动作的方式实现路由跳转。
            2)每次路径发生变化时可以把最新的路径放到仓库里面，以便随时在仓库中获取。
    ·模块
        connected-react-router总共分为以下几个模块：
            ·ConnectedRouter                监听路径变化，路由变化后向仓库派发动作
            ·connectRouter                  把传递过来的路径写入仓库
            ·routerMiddleware
            ·push
    用法：
        1.创建history对象
        2.添加routerMiddleware中间件。
        3.在reducers里添加connectRouter;
        4.把Route替换为ConnectedRouter。
        5.添加action,使用push返回action对象。
*/

```

# 2、redux-saga的使用

``` js
/* 
    ·介绍
        redux-saga 是一个 redux 的中间件，而中间件的作用是为 redux 提供额外的功能。在 reducers 中的所有操作都是同步的并且是纯粹的，
        即 reducer 都是纯函数，纯函数是指一个函数的返回结果只依赖于它的参数，并且在执行过程中不会对外部产生副作用，
        即给它传什么，就吐出什么。
        但是在实际的应用开发中，我们希望做一些异步的（如Ajax请求）且不纯粹的操作（如改变外部的状态），这些在函数式编程范式中被称为“副作用”
    `

*/
    function sum(a, b) {
        return a + b;
    }

```