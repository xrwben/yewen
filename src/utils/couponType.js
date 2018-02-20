// 优惠券类型
const couponType = function (value) {
  switch (value) {
    case 1:
      return '偷听优惠券'
    case 2:
      return '问答优惠券'
    case 3:
      return '约见优惠券'
    case 4:
      return '踩盘优惠券'
    case 5:
      return '方案优惠券'
    case 6:
      return '定制优惠券'
    case 7:
      return '通用优惠券'
  }
}
export default couponType
