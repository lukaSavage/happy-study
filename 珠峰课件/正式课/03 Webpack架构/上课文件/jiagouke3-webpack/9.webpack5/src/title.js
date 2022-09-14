//"sideEffects":false, 我这个项目里面没有副作用，则是没有使用的语句全部删除
//你就要确保你的项目的确没有副作用

document.title = '新标题';
export function getTitle(){
    console.log('getTitle');
}