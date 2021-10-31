export default {
  //设置歌曲url
  setMusicUrl(state, url) {
    state.musicUrl = url
    // state.musicState = true
    // console.log('我设置了播放状态为：' + state.musicState);
  },

  // 设置歌曲详细信息
  setSongDetail(state, obj) {
    state.songDetail = obj
  },

  // 设置用户id
  setUserId(state, id) {
    state.userId = id
  },

  //改变播放状态
  setMusicState(state) {
    state.musicState = !state.musicState
    // console.log('我设置了播放状态' + state.musicState);
  },

  // 改变歌曲列表
  setPlayList(state, list) {
    state.playList = list
  },

  // 清空播放列表，从逻辑上会连带着清空url和歌曲详情还有歌曲播放状态
  clearPlayList(state) {
    state.playList = []
    state.musicUrl = ''
    state.musicState = false
    state.songDetail = {
      id: 0,
      name: '',
      al: {
        picUrl: '',
      },
      ar: [
        {
          name: '',
        },
      ],
      dt: 0
    }
  },
}