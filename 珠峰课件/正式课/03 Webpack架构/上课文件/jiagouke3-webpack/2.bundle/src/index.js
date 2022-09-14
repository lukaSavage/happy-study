

let playButton = document.getElementById('play');
playButton.addEventListener('click',()=>{
    import('./video').then(result=>{
        console.log(result);
    });
});
//一旦出现了import,那么被 import的模块和它依赖的模块分分割出去生成一个新的代码块