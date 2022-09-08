<template>
  <!-- 需要注意，本文档中的 musicList为对播放列表进行下标索引后的某一歌曲数据，而非整个歌曲列表数据 -->
  <!-- 歌曲详情页顶部组件 -->
  <div class="detailTop">
    <!-- 背景图 -->
    <img :src="musicList.al.picUrl" alt="" class="bgImg" />
    <!-- 左边部分 -->
    <div class="detailTopLeft">
      <svg class="icon" aria-hidden="true" @click="updateDetailShow">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <!-- 歌曲名等 -->
      <div class="leftMarquee">
        <Vue3Marquee style="color:#fff">{{ musicList.al.name }}</Vue3Marquee>
        <span v-for="(item, index) in musicList.ar" :key="index">
          {{ changeArName(item.name, index, musicList.ar.length) }}
        </span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
    <!-- 右边部分 -->
    <div class="detaiTopRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <!-- 中段 -->
  <div class="detailContent" v-show="!isLyricShow" @click="isLyricShow=true">
    <!-- 唱片等img -->
    <!-- 通过动态绑定class，并传入对象形式来改变needle的样式，实现动画效果 -->
    <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}">
    <img src="@/assets/disc-plus.png" alt="" class="img_cd">
    <!-- 做一个判断，根据不同状态赋予class -->
    <img :src="musicList.al.picUrl" alt="" class="img_ar" :class="{img_ar_active:!isbtnShow,img_ar_paused:isbtnShow}">
  </div>
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow=false">
    <!-- 对计算属性进行列表渲染 -->
    <p v-for="(item,i) in lyric" :key="i"
      :class="{active: currentTime *1000 >= item.time && currentTime *1000 < item.pre }">
      {{item.lrc}}
    </p>
  </div>
  <!-- 底部 也可以分为三部分 -->
  <div class="detailFooter">
    <!-- 顶部由五个字体图标构成 -->
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-changpian1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jianyi"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <!-- 进度条 -->
    <div class="footerContent">
      <!-- 通过双向绑定 将当前时间绑定给进度条 -->
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.005 ">
    </div>
    <!-- 底部是播放功能的模块 -->
    <div class="footerBottom">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gl-repeat2"></use>
      </svg>
      <!-- 上一首 -->
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <!-- 播放与暂停 -->
      <svg class="icon bofang" aria-hidden="true" v-show="isbtnShow" @click="play">
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-show="!isbtnShow" @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <!-- 下一首 -->
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gl-playlistMusic5"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex';

export default {
props: ["musicList", "isbtnShow", "play","addDuration"],
setup(props) {
// console.log(props);
function changeArName(name, index, length) {
  if (index + 1 < length) {
    return name + ',';
  } else {
    return name;
  }
}

const isLyricShow = ref(false);

return { changeArName, isLyricShow };
},
mounted(){
  this.addDuration();
},
computed: {
  ...mapState(['lyricList', 'currentTime','playListIndex','playList','duration']),
// 对歌词进行处理
  lyric: function () { // 我们会获得一个数组，其中由一个个包含时间和歌词的对象组成
    let arr;
    // 只有获取到数据后我们才进行处理
    if (this.lyricList.lyric) {
      console.log(this.lyricList.lyric);
      // 根据正则匹配切割前面的事件，并放入map中对其进行处理
      arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
      // 获取时间
      let min = item.slice(1, 3);
      let sec = item.slice(4, 6);
      let mill = item.slice(7, 10);
      // 获取歌词
      let lrc = item.slice(11, item.length);
      if (isNaN(Number(mill))) {  // 如果毫秒数并非3位数，会将中括号也切割进来，我们对其进行 isNaN判断，并对错误切割进行修正
        mill = item.slice(7, 9);
        lrc = item.slice(10, item.length)
      }
      // 将时间转化为毫秒数，时间原本为字符串类型，通过parseInt转换为数字类型进行计算
      let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
      // 内部处理的信息进行返回
      return { min, sec, mill, lrc, time }
    })
    // 遍历新数组
    arr.forEach((item, i) => {
      // 当获取的为最后一项或最后一项为空时，给出一个默认值
      if (i === arr.length - 1 || isNaN(arr[i+1].time)) {
        item.pre = 1000;
      } else {
        // 将下个歌词对象的time赋给pre
        item.pre = arr[i + 1].time;
      }
    });
    }
  console.log(arr);
  // 将新的数组返回
  return arr
  }
},
methods: {
  ...mapMutations(['updateDetailShow','updatePlayListIndex']),
  // 切歌
  goPlay(value){
    let index = this.playListIndex + value
    // 第一首的上一首定位到列表的最后一首
    if (index < 0){
      index = this.playList.length - 1;
    }else if(index == this.playList.length){  // 最后一首的下一首定位到第一首
      index = 0;
    }
    this.updatePlayListIndex(index);
  }
},
components: {
  Vue3Marquee
},
watch:{
  currentTime:function(newValue){
    // p标签实现滚动
    let p = document.querySelector("p.active");
    // console.log([p])
    // 判断p是否有值
    if(p){
      if(p.offsetTop > 300){
        this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
      }
    }
    // 当我们监听到当前时间等于歌曲时长时即歌曲结束，切换下一首
    if(newValue===this.duration){
      // 直接调用我们的方法
      this.goPlay(1);
    }
  }
}
};
</script>

<style lang="less" scoped>
.detailTop {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  fill: #fff;

  .bgImg {
    width: 100%;
    height: 100%;
    // 脱离文档流
    position: absolute;
    // 置于底层
    z-index: -1;
    // 虚化
    filter: blur(50px);
  }

  .detailTopLeft {
    display: flex;
    align-items: center;

    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;

      span {
        color: #999;
      }

      .icon {
        fill: #999;
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
}

// 中段播放器样式
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  // needle样式
  .img_needle {
    width: 2.4rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 1s;
  }

  // 播放时样式
  .img_needle_active {
    width: 2.4rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 1s;
  }

  // cd样式
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }

  // 歌曲封面
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    // 绑定动画   动画名 动画时长 播放速度 是否无限循环
    animation: rotate_ar 10s linear infinite;
  }

  // 以下两个class用于控制动画的运行和暂停
  .img_ar_active {
    animation-play-state: running;
  }

  .img_ar_paused {
    animation-play-state: paused;
  }

  // 封面转动的动画效果
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
}

// 歌词样式
.musicLyric {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .2rem;
  // 溢出滚动
  overflow: scroll;

  p {
    color: #999;
    margin-bottom: .3rem;
  }

  .active {
    color: #fff;
    font-size: .6rem;
  }
}

// 底部样式
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // 字体图标
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      width: 0.6rem;
      height: 0.6rem;
      fill: rgb(245, 234, 234);
    }
  }
  // 进度条样式
  .range {
    width: 100%;
    height: 0.06rem;
  }
  // 播放等按钮字体图标
  .footerBottom {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      fill: rgb(245, 234, 234);
    }

    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>