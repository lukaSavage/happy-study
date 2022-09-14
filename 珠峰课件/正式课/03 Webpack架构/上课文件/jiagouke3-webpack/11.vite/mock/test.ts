
export default [
    {
        url:'/api/get',
        method:'GET',
        response:({query})=>{
            return {
                code:0,
                data:{
                    id:1,
                    title:'标题',
                    body:'内容'
                }
            }
        }
    }
]