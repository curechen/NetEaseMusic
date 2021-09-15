// 点击歌单后获取到的歌单详细内容
<template>
  <div>
    <song-content/>
  </div>
</template>

<script>
import SongContent from 'components/content/songContent/SongContent.vue'

export default {
  name: 'SongListContent',
  components: {
    SongContent
  }
}
</script>

<style scoped>
</style>
