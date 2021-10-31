// 播放列表
<template>
  <div class="playList">
    <div class="title">
      <p>当前播放</p>
      <span class="count">总{{ playList.length }}首</span>
      <span class="clear" @click="clearList">清空列表</span>
    </div>
    <div class="song topnav_box">
      <ul>
        <li
          v-for="(item, index) in playList"
          @dblclick="playMusic(item.id, index)"
          :key="index"
          :class="{ active: item.id === songDetail.id }"
        >
          <span class="image" v-show="item.id === songDetail.id">
            <img :src="convert" />
          </span>
          <span class="song-name">
            {{ item.name }}
            <!-- <i class="mv" v-if="item.mvid != 0" @click="playMV(item.mvid)" /> -->
          </span>
          <span class="song-singer">{{ item.ar[0].name }}</span>
          <span class="song-duration">{{ item.dt | filterTime }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { getDuration } from 'common/utils'

import { playMusic, getSongDetail } from 'network/search'

export default {
  name: 'PlayList',
  computed: {
    ...mapState(['playList', 'songDetail', 'musicState']),
    // 动态绑定图片链接
    convert() {
      if (this.musicState === true) {
        return require('assets/audio/play.png')
      } else {
        return require('assets/audio/pause.png')
      }
    },
  },
  filters: {
    filterTime(time) {
      return getDuration(time)
    },
  },
  methods: {
    clearList() {
      this.$store.commit('clearPlayList')
    },

    // 播放歌曲包括获取歌曲url和获得歌曲详细内容两部分
    // index是为了获得歌曲在当前列表中的序号，方便切换歌曲
    playMusic(id, index) {

      // 通过id拿到url，用audio控件播放
      playMusic(id).then((res) => {
        // console.log(res)
        let songUrl = res.data[0].url
        this.$store.commit('setMusicUrl', songUrl)
        if (this.musicState == false) {
          this.$store.commit('setMusicState')
        }
      })

      // 通过id拿到歌曲的详细信息
      getSongDetail(id).then((res) => {
        // console.log(res.songs[0])
        let songDetail = res.songs[0]
        songDetail.index = index
        this.$store.commit('setSongDetail', songDetail)
        // console.log(this.songDetail.index)
      })
    },
  },
}
</script>

<style scoped>
.active .song-name,
.active .song-singer {
  color: #ec4141 !important;
}

.playList {
  position: relative;
  width: 400px;
  height: 550px;
  /* padding: 0 15px 0; */
  box-sizing: border-box;
  box-shadow: -5px 0px 5px -5px rgba(0, 0, 0, 0.3);
  background-color: white;
  z-index: 111;
  overflow: hidden;
}

.playList .title {
  position: fixed;
  top: 60px;
  left: 695px;
  right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: white;
  border-bottom: 1px solid #f2f2f2;
  z-index: 2;
  /* overflow: hidden; */
}

.playList p {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.playList .count {
  font-size: 12px;
  color: #cfcfcf;
}

.playList .clear {
  float: right;
  font-size: 14px;
  color: #507daf;
}

.playList .clear:hover {
  cursor: pointer;
}

.playList .song {
  position: absolute;
  top: 82px;
  height: 468px;
  overflow-y: scroll;
  padding: 0 15px;
}

.playList ul li {
  position: relative;
  display: flex;
  width: 100%;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
}

/* 偶数选择器 */
.playList ul li:nth-of-type(even) {
  background-color: #f9f9f9;
}

.playList ul li .image img {
  position: absolute;
  top: 11px;
  left: -11px;
  width: 8px;
  height: 8px;
  filter: invert(54%) sepia(87%) saturate(3959%) hue-rotate(333deg)
    brightness(92%) contrast(101%);
}

.playList ul li .song-name {
  color: #363636;
  font-size: 12px;
  width: 180px;
  padding-left: 5px;
  /* margin-right: 6px; */

  /* 文字溢出... */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

.playList ul li .song-singer {
  color: #767676;
  font-size: 12px;
  width: 90px;
  padding-left: 6px;
  margin-right: 26px;

  /* 文字溢出... */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

.playList ul li .song-duration {
  color: #9f9f9f;
  font-size: 12px;
  width: 30px;
}

/* 滚轮样式设置 */
.topnav_box::-webkit-scrollbar {
  width: 6px;
}

.topnav_box::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* box-shadow: inset 0 0 6px rgba(225,225,225); */
  background-color: rgb(225, 225, 225);
}
</style>
