<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meirituijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diantai"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bangdan"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<style lang='less' scoped>
    .iconList{
        width: 100%;
        height: 2rem;
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
                width: 1rem;
                height: 1rem;
            }
        }
    }
</style>