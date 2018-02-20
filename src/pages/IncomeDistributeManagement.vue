<template>
  <div id="CheckManage">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="服务分成收入" name="ServiceDistributeIncome">
            <service-distribute-income v-if="activeName === 'ServiceDistributeIncome'"></service-distribute-income>
          </el-tab-pane>
          <el-tab-pane label="偷听分成收入" name="ListenDistributeIncome">
            <listen-distribute-income v-if="activeName === 'ListenDistributeIncome'"></listen-distribute-income>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ServiceDistributeIncome from '../components/incomeDistributeManagement/ServiceDistributeIncome.vue'
  import ListenDistributeIncome from '../components/incomeDistributeManagement/ListenDistributeIncome.vue'
  export default {
    data () {
      return {
        activeName: 'ServiceDistributeIncome'
      }
    },
    components: {
      ServiceDistributeIncome,
      ListenDistributeIncome
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
