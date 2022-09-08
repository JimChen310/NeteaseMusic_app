<template>
  <!-- 歌单详情页面的顶部按钮部分 -->
  <div class="itemMusicTop">
    <!-- 歌单详情页面的背景图片 -->
    <img :src="playlist.coverImgUrl" alt="" class="bgImg" />
    <!-- 顶部左侧 -->
    <div class="itemLeft">
      <!-- 返回按钮绑定事件 $router.go(-1) 返回上一页面 -->
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  // props接收父组件传递的参数
  props: ["playlist"],
  setup(props) {
    // console.log(props);
    // 通过props进行传递，判断如果无法获取数据，那么就去sessionStorage中获取
    // if ((props.playlist.creator = "")) {  // 此处判断条件特殊，照写即可
    //   // 通过 getItem 获取到json对象，通过parse将其转化为对象类型，并将其中存储的creator赋值
    //   props.playlist.creator = JSON.parse(
    //     sessionStorage.getItem('itemDetail')
    //   ).playlist.creator;
    // }
    return {};
  },
};
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-content: center;
  .itemLeft {
    width: 30%;
    height: 100%;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    // 单行的行内元素要在父容器中垂直居中应当使用 align-items
    align-items: center;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
    .icon {
      // 修改字体图表的颜色需要通过 fill属性
      fill: #fff;
    }
  }
  .itemRight {
    width: 25%;
    height: 100%;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      fill: #fff;
    }
  }
  .bgImg {
    width: 100%;
    height: 8rem;
    position: absolute;
    z-index: -1;
    // vue3中 filter作为样式属性是表示虚化
    filter: blur(30px);
  }
}
</style>