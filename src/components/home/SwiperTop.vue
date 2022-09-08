<template>
  <div id="swiperTop">
    <!-- 选取用懒加载的轮播图，对加载更友好 -->
    <van-swipe :autoplay="3000" lazy-render>
      <!-- 通过 v-for对图片 url形成的数组进行列表渲染 -->
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />    <!-- 数组中的元素通过 pic获取到图片的 url -->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from '@/request/api/home.js'
import { onMounted, reactive } from "vue";

export default {
  setup() {
    const state = reactive({    // 创建一个响应式对象,里面存放数组
      images: [],
    });
    // 渲染后发送请求
    onMounted(async () => { // 将该函数声明为 async异步函数
      // 向后台项目的 banner接口发送请求
      let res = await getBanner();  // 此处让函数等待 getBanner()返回的promise对象，获取到后在进行后续操作
      state.images = res.data.banners;
    });

    return { state };
  },
};
</script>

<style lang="less">
#swiperTop {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    // 轮播图的导航原点颜色
    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>