// 搜索的歌曲内容以及点击歌单获取的歌曲内容
<template>
  <div class="song-content">
    <ul>
      <li
        v-for="(item, index) in musicList"
        @dblclick="playMusic(item.id)"
        :key="index"
      >
        <span class="song-num">{{ sortIndex(index) }}</span>
        <span class="song-name">{{ item.name }}</span>
        <span
          class="mv"
          v-if="item.mvid != 0"
          @click="playMV(item.mvid)"
        ></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { playMusic } from 'network/search'

export default {
  name: 'SongContent',
  props: {
    musicList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      songUrl: '',
    }
  },
  methods: {
    // 索引排序
    sortIndex: function (index) {
      return index < 9 ? '0' + (index + 1) : index + 1
    },

    playMusic(id) {
      playMusic(id).then((res) => {
        this.songUrl = res.data[0].url
        console.log(this.songUrl)
        this.$store.commit('setMusicUrl', this.songUrl)
      })
    },
  },
  watch: {
    // eslint-disable-next-line
    $route: function (to, from) {
      // 若活跃路由发生改变，则重新搜索歌曲
      this.searchKey = this.$route.params.information
      this.searchMusic(this.searchKey)
    },
  },
}
</script>

<style scoped>
.song-content {
  width: 100%;
}

.song-content ul li {
  position: relative;
  width: 100%;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  padding-left: 15px;
}

/* 奇数选择器 */
.song-content ul li:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.song-content ul li .song-num {
  color: #c3c3db;
  font-size: 14px;
  margin-right: 20px;
}

.song-content ul li .song-name {
  /* color: #c3c3db; */
  font-size: 14px;
  margin-right: 20px;
}

/* mv设置 */
.song-content ul li .mv {
  position: absolute;
  display: inline-block;
  width: 24px;
  height: 18px;
  top: 6px;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-color: pink; */
  background-image: url(~assets/image/video.png);
}

.song-content ul li .mv:hover {
  cursor: pointer;
}
</style>
