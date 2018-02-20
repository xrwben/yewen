<template>
  <div id="FinancialDatas">
    <el-row>
      <el-col>
        <div class="income">累计订单收入总金额 &emsp; ￥ {{ orderIncome }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="income">累计订单退款总金额 &emsp; ￥ {{ orderRefund }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="income">累计提现总金额 &emsp; ￥ {{ drawCashTotal }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        orderIncome: 0,
        orderRefund: 0,
        drawCashTotal: 0
      }
    },
    mounted () {
      this.axios({
        method: 'get',
        url: '/yewen/admin/caiwu'
      }).then((result) => {
        if (result.data.code === 0) {
          this.orderIncome = Number(result.data.totalPay / 100.0).toFixed(2)
          this.orderRefund = Number(result.data.totalTuikuan / 100.0).toFixed(2)
          this.drawCashTotal = (result.data.totalTixian / 100.0).toFixed(2)
        } else {
          this.$message({
            message: result.data.msg,
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>

<style>
  .income{
    width: 300px;
    height: 80px;
    border: 1px solid #ddd;
    line-height: 80px;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 10px;
    background: #eef1f6;
  }
</style>
