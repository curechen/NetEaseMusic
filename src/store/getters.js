// getter可以理解为store的计算属性
export default {
  // 获得当前歌曲的图片链接
  getSongImg(state) {
    // console.log(state.songDetail);
    // return state.songDetail ? state.songDetail.al.picUrl : '' 
    return state.songDetail.al.picUrl
  },

  // 获得当前歌曲的名字
  getSongName(state) {
    return state.songDetail.name
  },

  // 获得当前歌曲歌手的名字
  getSongSinger(state) {
    return state.songDetail.ar[0].name
  },

  //获得音乐播放状态
  getMusicState(state) {
    return state.musicState
  },
}