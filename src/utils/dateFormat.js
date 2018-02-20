// 日期格式化
const dateFormat = function (value) {
  let year = new Date(value).getFullYear() || 0
  let month = (new Date(value).getMonth() + 1 || 0) < 10 ? '0' + (new Date(value).getMonth() + 1 || 0) : (new Date(value).getMonth() + 1 || 0)
  let date = (new Date(value).getDate() || 0) < 10 ? '0' + (new Date(value).getDate() || 0) : (new Date(value).getDate() || 0)
  // let hour = (new Date(value).getHours() || 0) < 10 ? '0' + (new Date(value).getHours() || 0) : (new Date(value).getHours() || 0)
  // let minute = (new Date(value).getMinutes() || 0) < 10 ? '0' + (new Date(value).getMinutes() || 0) : (new Date(value).getMinutes() || 0)
  // let second = (new Date(value).getSeconds() || 0) < 10 ? '0' + (new Date(value).getSeconds() || 0) : (new Date(value).getSeconds() || 0)
  // return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  return year + '-' + month + '-' + date
}
export default dateFormat
