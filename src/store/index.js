import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    profile: '',
    showLogin: 'true',
    musicInfo: {},
    // 播放列表
    musiclistId: [],
    // 播放数量
    musicCount: 0,
    // 正在播放的歌曲
    nowMusic: '',
    // 音乐清单
    nowMusicMenu: [],
    //音乐url
    musicUrl: '',
    //播放状态
    musicState: false,
    //正在播放的视频
    nowVideoInfo: {}
  },
  mutations,
  getters
})

export default store