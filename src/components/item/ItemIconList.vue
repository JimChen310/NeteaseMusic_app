<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-pinglun"></use>
      </svg>
      <span>{{playlist.commentCount}}</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{playlist.shareCount}}</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yunduanxiazai"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
export default {
    props:['playlist'],
    setup(props) {
        // console.log(props)
    },
}
</script>

<style lang='less' scoped>
    .iconList{
        width: 100%;
        height: 1.4rem;
        margin-top: .2rem;
        display: flex;
        // 水平均匀放置
        justify-content: space-around;
        // 垂直居中
        align-items: center;
        .iconItem{
            width: 25%;
            height: 100%;
            display: flex;
            // 定义弹性盒子中项目的排列方式
            flex-direction: column; // column 垂直；row 水平
            align-items: center;
            .icon{
                fill: #fff;
            }
            span{
                color: #fff;
                margin-top: 0.1rem;
            }
        }
    }
</style>