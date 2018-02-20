<template>
  <div id="FinancialData">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="用户反馈信息" name="UserFeedbackInformation">
            <user-feedback-information v-if="activeName === 'UserFeedbackInformation'"></user-feedback-information>
          </el-tab-pane>
          <el-tab-pane label="用户投诉信息" name="UserComplainInformation">
            <user-complain-information v-if="activeName === 'UserComplainInformation'"></user-complain-information>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import UserFeedbackInformation from '../components/informationCollect/UserFeedbackInformation.vue'
  import UserComplainInformation from '../components/informationCollect/UserComplainInformation.vue'
  export default {
    data () {
      return {
        activeName: 'UserFeedbackInformation'
      }
    },
    components: {
      UserFeedbackInformation,
      UserComplainInformation
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
