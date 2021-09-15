// 歌单
<template>
  <div class="songList">
    <song-list-item
      v-for="(item, index) in songLists"
      :key="index"
      :list-item="item"
    />
  </div>
</template>

<script>
import SongListItem from './SongListItem.vue'

export default {
  name: 'SongList',
  components: {
    SongListItem,
  },
  props: {
    songLists: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.songList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* padding: 2px; */
}
</style>
