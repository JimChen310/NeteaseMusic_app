<template>
  <div>
    <!-- 父组件props传参给各个子组件 -->
    <ItemMusicTop :playlist="state.playlist" v-if="state.playlist.creator" />
    <ItemMusicInfo :playlist="state.playlist" v-if="state.playlist.creator" />
    <ItemIconList :playlist="state.playlist" v-if="state.playlist.creator" />
    <ItemMusicList :playlist="state.playlist" :musiclist="state.musiclist" v-if="state.playlist.creator&&state.musiclist" />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList } from "../request/api/item.js";
import ItemMusicTop from "../components/item/ItemMusicTop.vue";
import ItemMusicInfo from "../components/item/ItemMusicInfo.vue";
import ItemIconList from "../components/item/ItemIconList.vue";
import ItemMusicList from "../components/item/ItemMusicList.vue";

export default {
  setup() {
    const state = reactive({
      // playlist用于接收详情页中所有的信息
      playlist: {},
      musiclist: [],
    });
    onMounted(async () => {
      // 通过useRoute函数，可以获取到query中携带的id
      let id = useRoute().query.id;
      // 获取歌单页面详情
      let res = await getMusicItemList(id);
      state.playlist = res.data.playlist;

      // 获取歌单列表信息
      // let result = await getMusicItem(id);
      state.musiclist = state.playlist.tracks;
      console.log(state.musiclist)
    });

    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicInfo,
    ItemIconList,
    ItemMusicList
  },
};
</script>
