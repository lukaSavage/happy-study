20:27
，
怎么感觉像嵌iframe￼
daywang
能加载 npm 发布的组件么￼
daywang
原理还是jsonp￼


npm run build remote
index.html html文件
main.js
remoteEntry.js


Object.assign

moduleMap = {
    "./RemoteList":
    Promise最终resolve的值是一个工厂方法  () => require("./src/RemoteList.js")

}

var get = (module, getScope) => {

}

var init = (shareScope, initScope) => {

}

window.remote  = {
    get,
    init
}

main.js
webpack/container/reference/remote = window.remote 

8081 host
main.js
加载远程模块
如何加载
通过jsonp加载 8080 remoteEntry.js
window.remote


8081需要remoteList  () => require("./src/RemoteList.js")


window.remote 

8080 remote
remoteEntry.js
