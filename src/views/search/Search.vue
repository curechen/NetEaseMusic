<template>
  <div class="search">
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
    this.searchMusic()
  },
  methods: {
    searchMusic() {
      let searchKey = this.searchKey
      searchMusic(searchKey).then(
        (res) => {
          this.musicList = res.result.songs
          console.log(this.musicList)
        },
        (err) => {
          console.log(err)
        }
      )
    },
  },
  watch: {
    // route里可以跟两个形参 to from 代表发生改变前后的对象
    $route() {
      // console.log(to)
      // console.log(from);
      this.searchKey = this.$route.params.information
      
      this.searchMusic()
    },
  },
}
</script>

<style scoped>
.search .song-content {
  border-top: 1px solid #f2f2f2;
}
.search {
  padding: 10px 30px;
}
</style>
