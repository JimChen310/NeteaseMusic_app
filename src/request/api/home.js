import service from '../index.js';

// 该函数用于首页获取轮播图数据
export function getBanner(){
    return service({
        method: 'GET',
        url: '/banner?type=2'
    })
}

// 该函数用于获取发现好歌单的数据
export function getMusicList(){
    return service({
        method:'GET',
        // 该接口后的limit参数，是获取的数据条数
        url:'/personalized?limit=10'
    })
}

// 搜索
export function getSearchMusic(data){
    return service({
        method:'GET',
        url:`/search?keywords=${data}`
    })
}

// 手机号登录
export function getPhoneLogin(data){
    return service({
        method:'GET',
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}

// 获取用户详情
export function getLoginUser(data){
    return service({
        method:'GET',
        url:`/user/detail?uid=${data}`
    });
}
