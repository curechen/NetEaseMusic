import { request } from "./request"

// 获取用户歌单
export function getUserList(uid) {
  return request({
    url: '/user/playlist',
    params: {
      uid
    }
  })
}