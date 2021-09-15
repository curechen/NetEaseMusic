<template>
  <div>
    <swiper :banners="bannersInfo" />

    <p class="title">
      推荐歌单
      <i class="el-icon-arrow-right" />
    </p>
    <song-list :songLists="songLists" />
  </div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper.vue'
import SongList from 'components/content/songList/SongList.vue'

import { getBanner, getRecommendSongList } from 'network/find'

export default {
  name: 'Personality',
  components: {
    Swiper,
    SongList,
  },
  data() {
    return {
      bannersInfo: [],
      songLists: [],
    }
  },
  mounted() {
    getBanner().then((res) => {
      // console.log(res)
      this.bannersInfo = res.banners
    })
    getRecommendSongList().then((res) => {
      // console.log(res.recommend);
      // console.log(this.songLists.length);
      for (let item of res.recommend) {
        if (this.songLists.length < 10) {
          this.songLists.push(item)
        }
      }
    })
  },
}
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.title i {
  margin-left: -4px;
}
</style>
