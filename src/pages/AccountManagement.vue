<template>
  <div id="FinancialData">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="账号管理" name="first">
            <account-management-list></account-management-list>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AccountManagementList from '../components/accountManagement/AccountManagementList.vue'
  export default {
    data () {
      return {
        activeName: 'first'
      }
    },
    components: {
      AccountManagementList
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
