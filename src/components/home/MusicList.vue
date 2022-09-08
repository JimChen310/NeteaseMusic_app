<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="130"
        :show-indicators="false"
        class="mySwipe"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <!-- 动态绑定参数，to中传递目标路由以及查询体参数，通过query传递每个歌单信息中携带的id，来实现不同歌单信息的抓取 -->
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <!-- 跳转的路由样式 /itemMusic?id=xxx -->
            <!-- 图片的url需要动态绑定 -->
            <img :src="item.picUrl" alt="" />
            <!-- 播放量包含一个字体图标和播放量数字 -->
            <span class="playCount">
              <!-- 播放量字体图标 -->
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang-copy"></use>
              </svg>
              <!-- 播放量数据需要经过函数处理 -->
              {{ changeCount(item.playCount) }}
            </span>
            <!-- 歌单名称 -->
            <span class="listName">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home.js";
import { onMounted, reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      musicList: [],
    });

    // 处理播放量
    function changeCount(num) {
      if (num >= 100000000) {
        // toFixed是小数点后保留的位数
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      } else {
        return num;
      }
    }

    onMounted(async () => {
      let res = await getMusicList();
      state.musicList = res.data.result;
      // console.log(state.musicList);
    });

    return { state, changeCount };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      // 单行文本的对齐方式
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.8rem;
    .van-swipe-item {
      // 每一项item的宽都在template中设置过
      padding-right: 0.2rem;
      position: relative;
      height: 100%;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
      }
      .playCount {
        // 父元素设定相对定位，子元素设置绝对定位
        position: absolute;
        // 置于顶层
        z-index: 100;
        right: 0.3rem;
        color: white;
        margin-top: 0.06rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          // 垂直居中后，利用margin微调位置
          vertical-align: middle;
          margin-top: -0.05rem;
        }
      }
      .listName {
        color: #000;
        bottom: 0px;
        // 超出两行省略号
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>