// 搜索的歌曲内容以及点击歌单获取的歌曲内容
<template>
  <div class="song-content">
    <div class="tab-bar">
      <span class="space"></span>
      <span class="title">音乐标题</span>
      <span class="singer">歌手</span>
      <span class="album">专辑</span>
      <span class="duration">时长</span>
    </div>
    <ul>
      <li
        v-for="(item, index) in musicList"
        @dblclick="playMusic(item.id)"
        :key="index"
      >
        <span class="song-num">{{ sortIndex(index) }}</span>
        <span class="song-name">
          {{ item.name }}
          <!-- <i class="mv" v-if="item.mvid != 0" @click="playMV(item.mvid)" /> -->
        </span>
        <span class="song-singer">{{ item.ar[0].name }}</span>
        <span class="song-album">{{ item.al.name }}</span>
        <span class="song-duration">{{ item.dt | filterTime }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { playMusic, getSongDetail } from 'network/search'

import { getDuration } from 'common/utils'

export default {
  name: 'SongContent',
  props: {
    musicList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    // getDuration(duration) {
    //   // console.log(duration)

    //   // parseInt保留整数部分，舍弃小数部分
    //   let allSecond = parseInt(duration / 1000)
    //   let min = parseInt(allSecond / 60)
    //   let sec = allSecond - min * 60
    //   sec = sec < 10 ? '0' + sec : sec
    //   return min + ':' + sec
    // },
    // 索引排序
    sortIndex: function (index) {
      return index < 9 ? '0' + (index + 1) : index + 1
    },

    // 播放歌曲包括获取歌曲url和获得歌曲详细内容两部分
    playMusic(id) {
      playMusic(id).then((res) => {
        console.log(res)
        let songUrl = res.data[0].url
        this.$store.commit('setMusicUrl', songUrl)
        this.$store.commit('setMusicState')
      })

      getSongDetail(id).then((res) => {
        console.log(res.songs[0])
        let songDetail = res.songs[0]
        this.$store.commit('setSongDetail', songDetail)
      })
    },
  },
  filters: {
    filterTime(time) {
      return getDuration(time)
    }
  }
}
</script>

<style scoped>
.song-content {
  width: 100%;
}

.song-content .tab-bar {
  display: flex;
  height: 30px;
  line-height: 30px;
  color: #8888a5;
  font-size: 14px;
  /* border-top: 1px solid #f2f2f2; */
  /* background-color: pink; */
}

.song-content .tab-bar .space {
  width: 160px;
  /* background-color: green; */
}

.song-content .tab-bar .title {
  width: 390px;
  /* background-color: red; */
}

.song-content .tab-bar .singer {
  width: 180px;
  /* background-color: blue; */
}

.song-content .tab-bar .album {
  width: 210px;
  /* background-color: yellow; */
}

.song-content .tab-bar .duration {
  width: 100px;
  /* background-color: paleturquoise; */
}

.song-content ul li {
  position: relative;
  display: flex;
  width: 100%;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
}

/* 奇数选择器 */
.song-content ul li:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.song-content ul li .song-num {
  /* box-sizing: border-box; */
  width: 124px;
  padding-left: 30px;
  font-size: 14px;
  color: #cacaca;
}

.song-content ul li .song-name {
  color: #363636;
  font-size: 14px;
  width: 370px;
  margin-right: 20px;

  /* 文字溢出... */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

.song-content ul li .song-singer {
  color: #363636;
  font-size: 14px;
  width: 160px;

  margin-right: 20px;

  /* 文字溢出... */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

.song-content ul li .song-album {
  color: #656565;
  font-size: 14px;
  width: 190px;
  margin-right: 20px;

  /* 文字溢出... */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

.song-content ul li .song-duration {
  color: #9f9f9f;
  font-size: 14px;
  width: 100px;
}

/* mv设置 */
.song-content ul li .mv {
  display: inline-block;
  position: relative;
  top: 5px;
  width: 24px;
  height: 18px;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-color: pink; */
  background-image: url(~assets/image/video.png);
}

.song-content ul li .mv:hover {
  cursor: pointer;
}
</style>
