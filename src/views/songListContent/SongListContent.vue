// 点击歌单后获取到的歌单详细内容
<template>
  <div>
    <content-top-bar :titles="['歌曲列表', '评论', '收藏者']"/>
    <song-content :music-list="musicList"/>
  </div>
</template>

<script>
import SongContent from 'components/content/songContent/SongContent.vue'

import ContentTopBar from './childComps/ContentTopBar.vue'

import { getSongListContent } from 'network/find'

export default {
  name: 'SongListContent',
  components: {
    SongContent,
    ContentTopBar
  },
  data() {
    return {
      id: 0,
      musicList: [],
    }
  },
  created() {
    this.id = this.$route.params.id
    getSongListContent(this.id).then((res) => {
      // console.log(res)
      this.musicList = res.playlist.tracks
    })
  },
}
</script>

<style scoped>
</style>
