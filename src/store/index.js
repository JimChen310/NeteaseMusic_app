import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item';
import { getPhoneLogin } from '@/request/api/home';

export default createStore({
  state: {
    playList: [{  // 播放列表
      al: {
          id: 3154234,
          name: "H-A-J-I-M-A-L-B-U-M-!!",
          pic: 7708676023185249,
          picUrl: "http://p4.music.126.net/7JzTu27rzLt_yCN87TADYQ==/7708676023185249.jpg"
      },
      // 此id才是实际能获取到歌曲的mp3的参数
      id: 32192783,
      ar:[{
        name:'KARAKURI'
      }]
    }],
    // 还需要存储一个默认下标,使得歌曲切换时有依据
    playListIndex: 0,
    isbtnShow:true, // true -> 显示播放按钮 false -> 显示暂停按钮
    detailShow:false, // 歌曲详情页的显示 
    lyricList:{}, // 歌词
    currentTime:0, // 播放器audio当前时间
    duration:0, // 歌曲总时长
    isLogin:false, // 判断是否登录
    isFooterShow:true, // 判断底部组件是否显示
    token:"", // token数值
    user:{}, // 用户信息
  },
  getters: {
  },
  mutations: {
    // 更新播放和暂停按钮的显示
    updateIsbtnShow(state){
      state.isbtnShow = !state.isbtnShow;
    },
    // 更新歌区播放列表
    updatePlayList(state,value){
      state.playList = value;
    },
    // 更新索引歌曲的下标 
    updatePlayListIndex(state,value){
      state.playListIndex = value;
    },
    // 更新弹出窗的显示布尔值
    updateDetailShow(state){
      state.detailShow = !state.detailShow;
    },
    // 更新歌词
    updateLyricList(state,value){
      state.lyricList = value;
    },
    // 更新播放器当前时间
    updateCurrentTime(state,value){
      state.currentTime = value;
    },
    // 更新当前歌曲总时长
    updateDuration(state,value){
      state.duration = value;
    },
    // 搜索列表播放歌曲
    pushPlayList(state,value){
      state.playList.push(value);
    },
    // 修改进入个人页面的布尔值
    updateIsLogin(state,value){
      state.isLogin = value;
    },
    // 存储token
    updateToken(state,value){
      state.token = value;
      // 储存到本地
      localStorage.setItem('token',state.token);
    },
    // 更新user信息
    updateUser(state,value){
      state.user = value;
      localStorage.setItem('user',JSON.stringify(state.user));
    },
  },
  actions: {
    // 通过获取的歌曲id发送http请求获取歌词
    getLyric:async function(content,value){
      let res = await getMusicLyric(value);
      // 调用定义的mutation修改仓库中的lyricList
      content.commit("updateLyricList",res.data.lrc)
    },
    // 登录
    getLogin:async function(content,value){
      let res = await getPhoneLogin(value);
      return res;
    }
  },
  modules: {
  }
})
