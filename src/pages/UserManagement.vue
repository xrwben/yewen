<template>
  <div id="userManagement">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <!--<el-tab-pane label="中介顾问管理" name="AgencyConsultantManagement">-->
            <!--<agency-consultant-management v-if="activeName === 'AgencyConsultantManagement'"></agency-consultant-management>-->
          <!--</el-tab-pane>-->
          <el-tab-pane label="顾问管理" name="OwnerConsultantManagement">
            <owner-consultant-management v-if="activeName === 'OwnerConsultantManagement'"></owner-consultant-management>
          </el-tab-pane>
          <el-tab-pane label="消费者管理" name="CustomerManagement">
            <customer-management v-if="activeName === 'CustomerManagement'"></customer-management>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AgencyConsultantManagement from '../components/userManagement/AgencyConsultantManagement.vue'
  import OwnerConsultantManagement from '../components/userManagement/OwnerConsultantManagement.vue'
  import CustomerManagement from '../components/userManagement/CustomerManagement.vue'
  export default {
    data () {
      return {
        activeName: 'OwnerConsultantManagement'
      }
    },
    components: {
      AgencyConsultantManagement,
      OwnerConsultantManagement,
      CustomerManagement
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
