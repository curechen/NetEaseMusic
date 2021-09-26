export default {
  //歌曲url
  setMusicUrl(state, url) {
    state.musicUrl = url
    // state.musicState = true
    // console.log('我设置了播放状态为：' + state.musicState);
  },

  // 歌曲详细信息
  setSongDetail(state, obj) {
    state.songDetail = obj
  },

  //改变播放状态
  setMusicState(state) {
    state.musicState = !state.musicState
    // console.log('我设置了播放状态' + state.musicState);
  },
}