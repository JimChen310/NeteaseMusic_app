<template>
  <!-- 底部组件 -->
  <div class="musicFooter">
    <!-- 左边部分 -->
    <div class="footerLeft" @click='updateDetailShow'>
      <!-- 歌曲图标 -->
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <!-- 歌曲名称及滑动提示 -->
      <div>
        <p>{{playList[playListIndex].al.name}}</p>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <!-- 右边部分 -->
    <div class="footerRight">
      <!-- 播放按钮以及暂停按钮,依靠v-show进行显示 -->
      <svg class="icon" aria-hidden="true" @click='play' v-show='isbtnShow'>
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-show='!isbtnShow'>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <!-- 列表图标 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gl-playlistMusic5"></use>
      </svg>
    </div>
    <!-- audio播放器,此处要应用到 ES6新内容 使用 ` 将动态内容嵌入到字符串中  -->
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    <!-- 弹出层-歌曲详情页 -->
    <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%',width: '100%' }">
      <MusicDetail :musicList='playList[playListIndex]' :isbtnShow="isbtnShow" :play="play" :addDuration="addDuration" />
    </van-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
import {mapState,mapMutations} from 'vuex'
import MusicDetail from './MusicDetail.vue'

export default {
    setup(){
      const interval = ref(0)
      return {interval}
    },

    // 通过辅助函数将仓库中的内容解构在computed内
    computed:{
        ...mapState(['playList','playListIndex','isbtnShow','detailShow','currentTime','duration'])
    },
    mounted(){
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id);
        this.addDuration();
    },
    updated(){
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
        this.addDuration();
    },
    methods:{
        ...mapMutations(['updateIsbtnShow','updateDetailShow','updateCurrentTime','updateDuration']),
        // 播放器函数
        play(){
            // 通过 $refs获取到了audio中的方法以及audio的状态
            if (this.isbtnShow == true){   // 判断是否在暂停状态
                this.$refs.audio.play(); 
                this.updateIsbtnShow(); 
                this.updateTime(); // 当我们点击歌曲播放后需要运行函数，并设置定时器
            }else{
                this.$refs.audio.pause();
                this.updateIsbtnShow(); 
                clearInterval(this.interval); // 暂停后消除定时器
            }
        },
        // 更新播放器的时间
        updateTime(){
          // 设置一个定时器，间隔执行
          this.interval = setInterval(() => {
            this.updateCurrentTime(this.$refs.audio.currentTime);
            // console.log(this.currentTime)
          },500)
        },
        // 传入歌曲总时长
        addDuration(){
          this.updateDuration(this.$refs.audio.duration);
        }
    },
    watch:{
        playListIndex:function(){   // 监听是否切歌
            if(this.isbtnShow == true){    // 判断当前是否audio在暂停状态
                this.updateIsbtnShow(); // 由于index发生变化,我们会触发自动播放,因此修改布尔值
            }
            clearInterval(this.interval);
            this.$refs.audio.autoplay = true;   // 切歌后自动进行播放
            this.updateTime();
        },
        playList:function(){  // 监听歌曲列表
            if(this.isbtnShow == true){
              this.$refs.audio.autoplay = true;
              this.updateIsbtnShow();
            }
            // 切换歌单后清除
            clearInterval(this.interval);
            this.updateTime();
        }
    },
    components:{
      MusicDetail
    }
}
</script>

<style lang='less' scoped>
.musicFooter {
  width: 100%;
  height: 1.4rem;
  bottom: 0;
  padding: .2rem;
  background-color: #fff;
  position: fixed;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  .footerLeft {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
    div{
        margin-left: .2rem;
        p{
            width: 3rem;
            // 超出一行文本框的内容将其隐藏
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
  }
  .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
            width: .6rem;
            height: .6rem;
        }
    }
}
</style>