
// 可以来继续数据库的操作了 （稍后我们要查询我希望我存放的数据 是整洁的） schema骨架 定义一种存储的方式 
const UserSchema = mongoose.Schema({
    time: {
        type: Date,
        default: new Date
    },
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number
    },
    hobby: {
        type: Array,
        default: []
    }
}, {
    timestamps: { // 可以用于记录插入数据的时间
        createAt: 'created',
        updatedAt: 'updated'
    }
})
// User 就是集合
const User = mongoose.model('User', UserSchema, 'user'); // 默认集合的名字是 model的名字小写+s
// 用户没有约定的属性是不能插入到数据库中的
// (async () => {
//     let arr = []
//     for(let i =20 ; i< 30;i++){
//         arr.push({ username: 'ZF', password: '123' ,age:i})
//     }
//     let user = await User.create(arr); // 调用一次插入
//     mongoose.disconnect();
// })();

// 删除
// (async()=>{
//     // let user = await User.deleteOne({username:'zf'});
//     // console.log(user)
// })()

// 查询
// (async()=>{ // find 表示查出所有 返回的是个数组  find findOne findById
//   let user =  await User.findById("60f1889b549ad10e8ca8d2b8");
//   console.log(user)
//   mongoose.disconnect();
// })()

// 修改
// (async()=>{ // find 表示查出所有 返回的是个数组  find findOne findById
//     // $push $pop $inc 递增
//     let user =  await User.updateOne({_id:"60f1889b549ad10e8ca8d2b8"},{$inc:{'age':10}});
//     mongoose.disconnect();
// })()
// (async () => {
//     // 查询 两种都有的关系
//     let user = await User.find({$or:[{age:18},{age:20}]}); // 根据匹配父进行查询
//     console.log(user)
//     mongoose.disconnect();
// })()


// 分页查询 当前第几页 ， 每页多少条
const currentPage = 3; // 1
const limit = 3;
(async () => {
    // 查询 两种都有的关系
    // 先查找，在倒序， 在跳过多少条， 在显示多少条
    let user = await User.find({}).skip((currentPage-1) * limit).sort({age:-1}).limit(limit); // 根据匹配父进行查询
    console.log(user);
    mongoose.disconnect();
})()

