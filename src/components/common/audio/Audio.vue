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
        <div class="prev">
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
        <div class="next">
          <a href="#" title="下一首">
            <img src="~assets/audio/next.png" alt="" />
          </a>
        </div>
      </div>
      <div class="audio-line">
        <span class="startTime">{{ songProgress | filterTime }}</span>
        <span class="endTime">{{ songDetail.dt | filterTime }}</span>

        <el-slider> </el-slider>
      </div>
    </div>
    <div class="left-menu">
      <audio :src="musicUrl" autoplay controls ref="audioRef" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { getDuration } from 'common/utils'

export default {
  name: 'Audio',
  data() {
    return {
      // 是否显示暂停
      // showPause: false,

      // 当前播放歌曲的进度
      songProgress: 0
    }
  },
  computed: {
    ...mapState(['musicUrl', 'songDetail', 'musicState']),
    ...mapGetters(['getSongImg', 'getSongName', 'getSongSinger']),
  },
  mounted() {
    const audio = this.$refs.audioRef
    //监听音频改变
    audio.addEventListener('timeupdate', () => {
      console.log(audio.currentTime);
      //获取歌曲时间
      this.songProgress = audio.currentTime * 1000
    })
  },
  methods: {
    switchAudio() {
      if (this.musicState) {
        this.$refs.audioRef.pause()
      } else {
        this.$refs.audioRef.play()
      }
      this.$store.commit('setMusicState')
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
  background-color: pink;
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
  width: 34px;
  height: 34px;
  line-height: 34px;
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
  left: 2px;
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
  left: 5px;
  line-height: 20px;
  font-size: 12px;
  font-weight: lighter;
  color: #9f9f9f;
}

.audio-container .audio .audio-line .endTime {
  position: absolute;
  right: 5px;
  line-height: 20px;
  font-size: 12px;
  font-weight: lighter;
  color: #9f9f9f;
}

.audio-container .audio .audio-line .el-slider {
  position: absolute;
  top: 7px;
  left: 42px;
  width: 400px;
  height: 20px;
}

.audio-container .audio .audio-line .el-slider >>> .el-slider__bar {
  background-color: #e83c3c;
}

.audio-container .audio .audio-line .el-slider >>> .el-slider__runway {
  margin: 0;
  background-color: #cdcdcd;
}

.audio-container .audio .audio-line .el-slider >>> .el-slider__button {
  height: 9px;
  width: 9px;
  background-color: #ec4141;
  border: 0;
  border-radius: 4px;
}

.audio-container .left-menu {
  position: absolute;
  top: 0;
  right: 0;
  height: 70px;
  width: 300px;
  /* background-color: purple; */
}

.audio-container .left-menu audio {
  position: absolute;
  top: 5px;
  /* left: 5px; */
  /* outline: none; */
}
</style>
