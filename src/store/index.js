import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 存储个人详细信息
    profile: '',
    // 用户id
    userId: 0,
    // 当前歌曲的详细信息
    songDetail: {
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
    },
    // 播放列表
    playList: [],
    // 正在播放的歌曲
    nowMusic: '',
    //音乐url
    musicUrl: '',
    //播放状态
    musicState: false,
  },
  mutations,
  getters
})

export default store