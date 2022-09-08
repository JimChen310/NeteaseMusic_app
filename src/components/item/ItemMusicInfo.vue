<template>
  <div class="itemMusicInfo">
    <div class="infoLeft">
      <img :src="playlist.creator.backgroundUrl" alt="" />
      <div class="playCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang-copy"></use>
        </svg>
        <span>{{ changeCount(playlist.playCount) }}</span>
      </div>
    </div>
    <div class="infoRight">
      <span class="infoTitle">{{ playlist.name }}</span>
      <div class="infoCreator">
        <img :src="playlist.creator.avatarUrl" alt="" />
        <span>{{ playlist.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <div class="infoFooter">
        <span>{{ playlist.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playlist"],
  setup(props) {
    // if ((props.playlist.creator = "")) {
    //   props.playlist.creator = JSON.parse(sessionStorage.getItem('itemDetail')).playlist.creator;
    // }
    // console.log(props);
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

    return { changeCount };
  },
};
</script>

<style lang="less" scoped>
.itemMusicInfo {
  width: 100%;
  height: 3rem;
  margin-top: 0.4rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  .infoLeft {
    width: 36%;
    height: 2.6rem;
    position: relative;
    // 歌单封面
    img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.2rem;
      // 用于给播放量定位
      position: absolute;
      z-index: -1;
    }
    // 播放量
    .playCount {
      position: absolute;
      right: 0.1rem;
      margin-top: 0.1rem;
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.02rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.26rem;
        color: #fff;
      }
    }
  }
  .infoRight {
    width: 60%;
    height: 2.6rem;
    // 将右半部分所有元素按照垂直列排列
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // 歌单名称
    .infoTitle {
      font-size: 0.3rem;
      font-weight: 900;
      color: #fff;
      font-family: "微软雅黑";
    }
    // 歌单创建信息
    .infoCreator {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #ccc;
      // 创建者头像
      img {
        width: 0.6rem;
        height: 0.6rem;
        // 圆形
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        margin-left: 0.1rem;
      }
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        // 先让icon在整个父容器中垂直居中再调整位置
        vertical-align: middle;
        margin-top: -0.05rem;
        fill: #ccc;
      }
    }
  }
  .infoFooter {
    width: 100%;
    height: 0.6rem;
    display: flex;
    // 由于是行内元素，因此用 align-items进行子元素的垂直居中
    align-items: center;
    // align-content: center;
    justify-content: space-between;
    span {
      display: inline-block;
      height: 100%;
      width: 95%;
      font-size: 0.24rem;
      color: #ccc;
      // 超出两行省略号
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .icon {
      fill: #fff;
    }
  }
}
</style>