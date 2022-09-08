import { Button,Swipe, SwipeItem, Image, Popup } from 'vant';

// 将vant中需要用到模块放入一个数组中
let plugins = [
    Button, Swipe, SwipeItem, Image, Popup
]

// 传递出去一个专门用于 import vant的函数
export default function importVant(app){    // 向该函数中传入 app对象
    plugins.forEach((item) => { // 对数组进行遍历
        return app.use(item)
    })
}