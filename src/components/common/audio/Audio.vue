<template>
  <div class="audio-container">
    <div class="album">
      <img src="~assets/image/bg.jpeg" alt="" />
      <div class="intro">
        <p class="song">Sayama</p>
        <p class="singer">Rain</p>
      </div>
    </div>
    <div class="audio">
      <audio :src="musicUrl" autoplay controls/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Audio',
  computed: {
    ...mapState(['musicUrl'])
  }
}
</script>

<style scoped>
.audio-container {
  display: flex;
}

.album {
  position: relative;
  width: 300px;
  height: 70px;
  background-color: white;
}

.album img {
  position: absolute;
  top: 12px;
  left: 14px;
  width: 46px;
  height: 46px;
  border-radius: 5px;
}

.album .intro {
  position: absolute;
  top: 21px;
  left: 75px;
  /* font-size: 12px; */
  /* line-height: 1; */
}

.album .intro .song {
  font-size: 15px;
  margin-bottom: 5px;
}

.album .intro .singer {
  font-size: 10px;
}

.audio {
  position: relative;
  flex: 1;
  /* background-color: green; */
}

.audio audio {
  position: absolute;
  top: 5px;
  left: 5px;
  /* outline: none; */
}
</style>
