<template>
  <div id="DrawCashManagement">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="资金提现管理" name="CashManagement">
            <cash-management v-if="activeName === 'CashManagement'"></cash-management>
          </el-tab-pane>
          <el-tab-pane label="资金提现记录" name="CashRecord">
            <cash-record v-if="activeName === 'CashRecord'"></cash-record>
          </el-tab-pane>
          <el-tab-pane label="提现免审额度" name="CashLimit">
            <cash-limit v-if="activeName === 'CashLimit'"></cash-limit>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import CashManagement from '../components/drawCashManagement/CashManagement.vue'
  import CashRecord from '../components/drawCashManagement/CashRecord.vue'
  import CashLimit from '../components/drawCashManagement/CashLimit.vue'
  export default {
    data () {
      return {
        activeName: 'CashManagement'
      }
    },
    components: {
      CashManagement,
      CashRecord,
      CashLimit
    },
    methods: {
      getDatas (tab) {
        console.log(tab.index)
      }
    }
  }
</script>

<style>

</style>
