
let module = {
    rules:[
        {
            oneOf:[
                {
                    test:/\/js/,
                    use:['loader1']
                },
                {
                    test:/\/css/,
                    use:['loader2']
                }
            ]
        }
       
    ]
}
//a.js
//因为一般来说我们每个文件类型只会配置一个loader
//switch case break
