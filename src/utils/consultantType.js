// 顾问类型
const consultantType = function (value) {
  switch (value) {
    case 1:
      return '中介顾问'
    case 2:
      return '业主顾问'
    case 3:
      return '大咖顾问'
    case 4:
      return '金牌顾问'
    case 5:
      return '资深顾问'
    default:
      return '普通用户'
  }
}
export default consultantType
