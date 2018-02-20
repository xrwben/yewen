// 订单类型
const orderType = function (value) {
  switch (value) {
    case 1:
      return '偷听服务'
    case 2:
      return '问答服务'
    case 3:
      return '约见服务'
    case 4:
      return '踩盘服务'
    case 5:
      return '方案服务'
    case 6:
      return '定制服务'
  }
}
export default orderType
