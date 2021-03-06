// 防抖
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    // console.log('timer1 ' + timer);
    if (timer) clearTimeout(timer)
    // console.log('timer2 ' + timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 日期
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 歌曲时间格式化 毫秒
export function getDuration(duration) {
  // console.log(duration)

  // parseInt保留整数部分，舍弃小数部分
  let allSecond = parseInt(duration / 1000)
  let min = parseInt(allSecond / 60)
  let sec = allSecond - min * 60
  min = min < 10 ? '0' + min : min
  sec = sec < 10 ? '0' + sec : sec
  return min + ':' + sec
}
