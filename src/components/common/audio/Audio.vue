<template>
  <div class="audio-container">
    <div class="album" v-show="songDetail.al.picUrl != ''">
      <img :src="getSongImg" alt="" />
      <div class="intro">
        <p class="song">{{ getSongName }}</p>
        <p class="singer">{{ getSongSinger }}</p>
      </div>
    </div>
    <div class="audio">
      <div class="audio-button" :class="{ disable: songDetail.name === '' }">
        <div class="prev" @click="switchSong(1)">
          <a href="#" title="上一首">
            <img src="~assets/audio/prev.png" alt="" />
          </a>
        </div>
        <div class="play" @click="switchAudio()">
          <!-- <el-tooltip class="item" effect="light" content="播放" placement="top">
          </el-tooltip> -->
          <a href="#" title="播放">
            <img src="~assets/audio/play.png" v-if="!musicState" alt="" />
          </a>
          <a href="#" title="暂停">
            <img src="~assets/audio/pause.png" v-if="musicState" alt="" />
          </a>
        </div>
        <div class="next" @click="switchSong(0)">
          <a href="#" title="下一首">
            <img src="~assets/audio/next.png" alt="" />
          </a>
        </div>
      </div>
      <div class="audio-line">
        <span class="startTime">{{ (songProgress * 1000) | filterTime }}</span>
        <span class="endTime">{{ songDetail.dt | filterTime }}</span>

        <el-slider
          v-model="songProgress"
          @change="songProgressChange"
          :max="totalDuration"
          :show-tooltip="false"
        />
      </div>
    </div>
    <div class="left-menu">
      <div class="sound">
        <el-slider
          v-model="sound"
          :max="maxSound"
          @input="soundChange"
          height="90px"
          vertical
        />
        <a href="#" title="音量调节">
          <img src="~assets/audio/sound.png" alt="" />
        </a>
      </div>
      <div class="list">
        <play-list class="page" v-show="pageShow" />
        <a href="#" title="打开播放列表" @click="clickShow">
          <img src="~assets/audio/list.png" alt="" />
        </a>
      </div>
      <audio :src="musicUrl" autoplay controls ref="audioRef" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { getDuration } from 'common/utils'

import { playMusic } from 'network/search'

import PlayList from 'components/content/playList/PlayList.vue'

export default {
  name: 'Audio',
  components: {
    PlayList,
  },
  data() {
    return {
      // 是否显示暂停
      // showPause: false,
      // 当前播放歌曲的总时长
      totalDuration: 0,
      // 当前播放歌曲的进度
      songProgress: 0,
      // 声音调节
      sound: 10,
      maxSound: 100,
      soundShow: false,
      pageShow: false,
    }
  },
  computed: {
    ...mapState(['musicUrl', 'songDetail', 'musicState', 'playList']),
    ...mapGetters(['getSongImg', 'getSongName', 'getSongSinger']),
  },
  mounted() {
    const audio = this.$refs.audioRef
    //监听音频改变
    audio.addEventListener('timeupdate', () => {
      //获得音频长度
      this.totalDuration = audio.duration
      //获取歌曲时间
      this.songProgress = audio.currentTime
    })
    audio.addEventListener('ended', () => {
      this.switchSong(0)
    })
  },
  methods: {
    // 切换音频播放状态
    switchAudio() {
      if (this.musicState) {
        this.$refs.audioRef.pause()
      } else {
        this.$refs.audioRef.play()
      }
      this.$store.commit('setMusicState')
    },
    // 切换歌曲,num为0时为下一首，为1时为上一首
    switchSong(num) {
      let index = this.songDetail.index
      let songDetail = {}
      if (num == 0) {
        // 模拟循环
        if (index < this.playList.length - 1) {
          songDetail = this.playList[index + 1]
          songDetail.index = index + 1
        } else {
          songDetail = this.playList[0]
          songDetail.index = 0
        }
      } else {
        if (index > 0) {
          songDetail = this.playList[index - 1]
          songDetail.index = index - 1
        } else {
          songDetail = this.playList[this.playList.length - 1]
          songDetail.index = this.playList.length - 1
        }
      }
      this.$store.commit('setSongDetail', songDetail)

      // 通过id拿到url，用audio控件播放
      playMusic(songDetail.id).then((res) => {
        // console.log(res)
        let songUrl = res.data[0].url
        this.$store.commit('setMusicUrl', songUrl)
      })
    },
    // 时间进度条方法
    songProgressChange(e) {
      this.$refs.audioRef.currentTime =
        (e / this.totalDuration) * this.totalDuration
      console.log((e / this.totalDuration) * this.totalDuration)
      console.log(this.$refs.audioRef.currentTime)
      // this.$refs.audioRef.currentTime = e/100*getDuration(this.songDetail.dt)
    },
    // 声音进度条方法
    soundChange(e) {
      this.$refs.audioRef.volume = e / 100
    },
    clickShow() {
      this.pageShow = !this.pageShow
    },
  },
  filters: {
    filterTime(time) {
      return getDuration(time)
    },
  },
  watch: {
    // songDetail(val, oldval) {
    //   console.log('123' + val);
    //   console.log(oldval);
    // }
  },
}
</script>

<style scoped>
.disable {
  /* cursor: not-allowed !important; */
  opacity: 0.5;
  pointer-events: none;
}

.audio-container {
  position: relative;
}

.audio-container .album {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 70px;
  /* background-color: pink; */
}

.audio-container .album img {
  position: absolute;
  top: 12px;
  left: 14px;
  width: 46px;
  height: 46px;
  border-radius: 5px;
}

.audio-container .album .intro {
  position: absolute;
  top: 18px;
  left: 72px;
  /* line-height: 1; */
}

.audio-container .album .intro .song {
  font-size: 15px;
  margin-bottom: 6px;
}

.audio-container .album .intro .singer {
  font-size: 10px;
}

.audio-container .audio {
  position: absolute;
  width: 480px;
  height: 70px;
  left: 300px;
  /* background-color: pink; */
  z-index: 22;
}

.audio-container .audio .audio-button {
  /* position: relative; */
  height: 50px;
  /* font-size: 18px; */
  /* background-color: blue; */
}

.audio-container .audio .audio-button .prev {
  position: absolute;
  top: 20px;
  left: 175px;
}

.audio-container .audio .audio-button .prev img {
  width: 18px;
  height: 18px;
  filter: invert(100%);
}

.audio-container .audio .audio-button .play {
  position: absolute;
  /* top: 22px;
  left: 233px; */
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  border-radius: 50%;
  background-color: #f4f4f4;
}

.audio-container .audio .audio-button .play:hover {
  background-color: #e5e5e5;
  cursor: pointer;
}

.audio-container .audio .audio-button .play img {
  position: relative;
  left: 1px;
  width: 14px;
  height: 14px;
  filter: invert(100%);
}

.audio-container .audio .audio-button .next {
  position: absolute;
  top: 20px;
  right: 175px;
}

.audio-container .audio .audio-button .prev:hover,
.audio-container .audio .audio-button .next:hover {
  filter: invert(71%) sepia(65%) saturate(4666%) hue-rotate(320deg)
    brightness(97%) contrast(92%);
}

.audio-container .audio .audio-button .next img {
  width: 18px;
  height: 18px;
  filter: invert(100%);
}

.audio-container .audio .audio-line {
  position: relative;
  height: 20px;
  /* background-color: yellowgreen; */
}

.audio-container .audio .audio-line .startTime {
  position: absolute;
  top: 0;
  left: 4px;
  /* line-height: 20px; */
  font-size: 12px;
  font-weight: lighter;
  color: #9f9f9f;
}

.audio-container .audio .audio-line .endTime {
  position: absolute;
  top: 0;
  right: 4px;
  /* line-height: 20px; */
  font-size: 12px;
  font-weight: lighter;
  color: #9f9f9f;
}

.audio-container .el-slider >>> .el-slider__button {
  height: 8px;
  width: 8px;
  background-color: #ec4141;
  border: 0;
  border-radius: 4px;
}

.audio-container .audio .audio-line .el-slider {
  position: absolute;
  top: 4px;
  left: 42px;
  width: 400px;
  height: 20px;
}

.audio-container .audio .audio-line .el-slider >>> .el-slider__bar {
  background-color: #e83c3c;
  height: 4px;
}

.audio-container .audio .audio-line .el-slider >>> .el-slider__runway {
  margin: 0;
  background-color: #cdcdcd;
  height: 4px;
}

.audio-container .audio .audio-line .el-slider >>> .el-slider__button-wrapper {
  top: -16px;
}

.audio-container .left-menu {
  position: absolute;
  top: 0;
  right: 0;
  height: 70px;
  width: 300px;
  /* background-color: purple; */
}

.audio-container .left-menu .list {
  position: absolute;
  top: 28px;
  right: 35px;
}

.audio-container .left-menu .list img {
  width: 20px;
  height: 20px;
  /* filter: invert(100%); */
}

.audio-container .left-menu .sound {
  position: absolute;
  top: 28px;
  right: 75px;
}

.audio-container .left-menu .sound img {
  width: 20px;
  height: 20px;
  /* filter: invert(100%); */
}

/* 音量调节方框的主要样式 */
.audio-container .left-menu .sound .el-slider {
  position: absolute;
  display: none;
  top: -106px;
  left: -6px;
  height: 106px;
  width: 30px;
  padding-top: 8px;
  box-sizing: border-box;
  z-index: 999;
  border-radius: 7px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

/* 鼠标悬浮时显示 */
.audio-container .left-menu .sound:hover .el-slider {
  display: block;
}

.audio-container .left-menu .sound .el-slider >>> .el-slider__bar {
  background-color: #e83c3c;
  width: 4px;
}

/* 调节圆点方位 */
.audio-container .left-menu .sound .el-slider >>> .el-slider__button-wrapper {
  left: -16px;
}

.audio-container .left-menu .sound .el-slider >>> .el-slider__runway {
  background-color: #e6e6e6;
  margin: auto;
  width: 4px;
}

.audio-container .left-menu .list .page {
  position: absolute;
  top: -579px;
  left: -345px;
}

.audio-container .left-menu audio {
  display: none;
  position: absolute;
  top: 5px;
  /* left: 5px; */
  /* outline: none; */
}
</style>
