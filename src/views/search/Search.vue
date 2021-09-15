<template>
  <div>
    <song-content :musicList="musicList" />
  </div>
</template>

<script>
import SongContent from 'components/content/songContent/SongContent.vue'

import { searchMusic } from 'network/search'

export default {
  name: 'Search',
  components: {
    SongContent,
  },
  data() {
    return {
      searchKey: '',
      musicList: [],
    }
  },
  created() {
    this.searchKey = this.$route.params.information
  },
  mounted() {
    // console.log('创建')
    this.searchMusic(this.searchKey)
  },
  methods: {
    searchMusic() {
      let searchKey = this.searchKey
      searchMusic(searchKey).then(
        (res) => {
          console.log(res)
          this.musicList = res.result.songs
        },
        (err) => {
          console.log(err)
        }
      )
    },
  },
}
</script>

<style scoped>
</style>
