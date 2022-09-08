import service from '../index.js'

// 获取歌单详情页的数据
export function getMusicItemList(id){
    return service({
        method: 'GET',
        url: '/playlist/detail?id='+id
    })
}

// 获取歌单列表的数据
// export function getMusicItem(id){
//     return service({
//         method: 'GET',
//         // id是歌单独有的识别；limit是获取的上限；offset是获取数据的起始索引
//         url: '/playlist/track/all?id='+id+'&limit=20&offset=0'
//     })
// }

// 获取歌词
export function getMusicLyric(data){
    return service({
        method: 'GET',
        url: `/lyric?id=${data}`
    })
}