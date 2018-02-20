// 请求后台数据之前转换入参
const toFormData = (data) => {
  let dataArr = []
  for (let item in data) {
    dataArr.push(`${item}=${data[item]}`)
  }
  return dataArr.join('&')
}

export default toFormData
