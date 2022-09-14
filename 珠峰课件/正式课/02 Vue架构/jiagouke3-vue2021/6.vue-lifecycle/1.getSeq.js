// 2,3,5,6,8,7,9,4  这个序列中最长递增子序列 是多长？

// 潜力： 
// 如果当前找到的值比末尾大，直接将值添加到后面，如果当前这个值比末尾小，就去序列中通过二分查找的方式将比他大的值替换掉


// 1 3 8 7 6 4 2 // 最长连续多少？


// 1
// 1 3 
// 1 3 8
// 1 3 7
// 1 3 6
// 1 3 4
// 1 2 4
// 需要求一个序列他的索引值 
function getSeq(arr) {
    let len = arr.length;
    let result = [0]; // 默认先将第一个索引作为连续的开头
    let p = arr.slice(0); // 用来存索引的
    for (let i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) { // 数组中0要去掉 因为对于vue3 而言 为0的时候标识这个元素是要创建的
            let resultLastIndex = result[result.length - 1];
            if (arr[resultLastIndex] < arrI) { // 当前的值 比最后一项大，那么就累计索引
                p[i] = resultLastIndex; // 在放入之前记住前一个人的索引
                result.push(i);
                continue; // 如果是比最后一项大的后续逻辑就不用走了
            }
            // [1,3,8，100,200,400，800] 中找比7大的值, 二分查找可以处理 递增序列  nlogn
            let start = 0;
            let end = result.length - 1; // 1 3 8   0/2   
            let middle;
            while (start < end) { // 终止条件 最后start和end重合就找到了
                middle = (start + end) / 2 | 0; // 去中间的值
                if (arr[result[middle]] < arrI) { // 向后缩小范围 
                    start = middle + 1;
                } else {
                    end = middle
                }
            }
            // 最后就找到了中间我要找的那个人 1 3 8 7  -> 1 3 7
            if (arrI < arr[result[end]]) {
                if(start > 0) {
                    p[i] = result[start-1]; // 替换的时候记住我的替换那个人的前一个人索引
                }
                result[start] = i; // 直接用当前的索引换掉老的索引， 替换成更有潜力的那一项
            }
        }
        // 找到结果集的最后一项，倒叙的查找回来
        let len = result.length;
        let last = result[len - 1];
        while (len-- >  0 ) {
            result[len] = last;
            last = p[last]; // 通过最后一项倒叙查找
        }
    }
    return result
}
console.log(getSeq([2,3,1,5,6,8,7,9,4])); // 065, 最终要的是 134 -》 015 （通过前驱节点来进行查找）

// 前驱节点，在我没有替换之前，我先把关系保存起来