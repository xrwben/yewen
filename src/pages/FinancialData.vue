<template>
  <div id="FinancialData">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="财务数据" name="first">
            <financial-datas></financial-datas>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import FinancialDatas from '../components/financialData/FinancialDatas.vue'
  export default {
    data () {
      return {
        activeName: 'first'
      }
    },
    components: {
      FinancialDatas
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
