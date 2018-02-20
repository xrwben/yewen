// 订单状态
const orderStatus = function (value) {
  switch (value) {
    case 1:
      return '待支付'
    case 2:
      return '待评价'
    case 3:
      return '已完成'
    case 4:
      return '退款中'
    case 5:
      return '拒绝退款'
    case 6:
      return '退款成功'
  }
}
export default orderStatus
