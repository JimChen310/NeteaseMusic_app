<template>
  <div class="topNav">
    <div class="topleft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>

    <div class="topContent">
      <span @click="$router.push('/userinfo')">我的</span>
      <span class='active'>发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>

    <div class="topright">
      <!-- 通过点击事件跳转路由 -->
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>

// less的优点，子代选择可以直接在内部定义
<style lang='less' scoped>
    .topNav{
        width: 100%;
        // rem会随着缩放而变化
        height: 1rem;
        padding: .2rem;
        // 多用弹性布局
        display: flex;
        // 两端对齐
        justify-content: space-between;
        // 垂直纵向居中
        align-items: center;
        .topContent{
            width: 60%;
            height: 100%;
            font-size: .36rem;
            display: flex;
            justify-content: space-around;
            .active{
                font-weight: 900;
            }
        }
    }
</style>
