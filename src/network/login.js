import { request } from './request'

// export function accountLogin(phone, password) {
//   return request({
//     url: '/login/cellphone',
//     method: 'post',
//     data: {
//       phone,
//       password
//     }
//   })
// }

// 通过手机号的方式登录
export function accountLogin(data, timestamp) {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data,
    params: {
      timestamp
    }
  })
}

// 获取账号信息，是为了拿到用户id
export function getUserDetail() {
  return request({
    url: '/user/account'

  })
}