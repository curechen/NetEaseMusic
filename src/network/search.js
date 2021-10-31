import { request } from "./request"

export function searchMusic(keywords) {
  return request({
    url: '/cloudsearch',
    params: {
      keywords
    }
  })
}

// 接口里歌曲url和歌曲详情就是分开的，所以要分开获取

// 获取播放歌曲url
export function playMusic(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

// 获取播放歌曲详情
export function getSongDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}