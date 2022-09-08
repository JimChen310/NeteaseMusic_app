<template>
  <div class="itemMusicList">
    <!-- 歌单顶部的两个部分 -->
    <div class="itemListTop">
      <!-- 左边 -->
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <span
          >播放全部<span>(共{{ musiclist.length }}首)</span></span
        >
      </div>
      <!-- 右边 -->
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏({{ playlist.subscribedCount }})</span>
      </div>
    </div>
    <!-- 具体的歌曲内容 -->
    <div class="itemList">
      <!-- 全部的歌曲进行列表渲染 -->
      <div class="item" v-for="(item, i) in musiclist" :key="i">
        <div class="itemLeft" @click='playMusic(i)'>
          <!-- 歌曲的索引序列 -->
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <!-- 歌曲名称 -->
            <p>{{ item.al.name }}</p>
            <!-- 作者有多个,需要对作者数据进行循环遍历渲染 -->
            <span v-for="(item1, index) in item.ar" :key="index">
              {{ changeArName(item1.name, index, item.ar.length) }}
            </span>
          </div>
        </div>
        <div class="itemRight">
          <!-- mv图标是否显示需要对其中的数据进行判断,非0时表示有mv -->
          <svg class="icon bofang" aria-hidden="true" v-show="item.mv != 0">
            <use xlink:href="#icon-bofangMV"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  props: ["playlist", "musiclist"],
  setup(props) {
    // 传入名称,索引下标,以及作者数组的长度,对作者名称进行修改判断
    function changeArName(name,index,length){
      if (index+1 < length) {
        return name + ',';
      }else {
        return name;
      }
    }
    return {changeArName};
  },
  methods:{
    ...mapMutations(['updatePlayList','updatePlayListIndex']),
    playMusic(i){
      this.updatePlayList(this.musiclist)
      this.updatePlayListIndex(i)
    }
  }
};
</script>

<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 10rem;
  background-color: #fff;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  // 左上角和右上角的单独圆角设置
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  // 歌单顶端组件
  .itemListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft {
      width: 3rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        stroke: #333333;
        // 笔触宽度
        stroke-width: 20;
      }
      span {
        font-weight: 700;
        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
      }
    }
    // 歌单顶部右侧
    .listRight {
      display: flex;
      align-items: center;
      background-color: red;
      padding: 0.2rem;
      border-radius: 0.4rem;
      color: #fff;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #fff;
        margin-right: 0.1rem;
        stroke: #fff;
        stroke-width: 50;
      }
    }
  }
  .itemList {
    width: 100%;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: 0.4rem;
            // 隐藏超出的内容
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span {
            font-weight: 400;
            font-size: 0.24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight {
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .bofang {
          position: absolute;
          left: 0;
        }
        .liebiao {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>