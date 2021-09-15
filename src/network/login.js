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