import { request } from "./request"

// 获取轮播图
export function getBanner() {
  return request({
    url: '/banner'
  })
}

// 获取每日推荐歌单
export function getRecommendSongList() {
  return request({
    url: 'recommend/resource'
  })
}

// 获取歌单详情
export function getSongListContent(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}