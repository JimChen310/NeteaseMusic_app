<template>
  <div>
    <router-view/>
    <MusicFooter v-if="$store.state.isFooterShow" />
  </div>
</template>

<script>
import MusicFooter from './components/item/MusicFooter.vue'

export default {
  setup() {
    
  },
  components:{
    MusicFooter
  }
}
</script>

<style lang="less">
// 通配符对整个页面进行设置
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
// 对字体图标进行设置
.icon{
  width: .5rem;
  height: .5rem;
}
</style>
