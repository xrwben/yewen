<template>
  <div id="CheckManage">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="成为中介顾问" name="AgencyConsultant">
            <agency-consultant v-if="activeName === 'AgencyConsultant'"></agency-consultant>
          </el-tab-pane>
          <el-tab-pane label="成为业主顾问" name="OwnerConsultant">
            <owner-consultant v-if="activeName === 'OwnerConsultant'"></owner-consultant>
          </el-tab-pane>
          <el-tab-pane label="退款/售后" name="Refund">
            <refund v-if="activeName === 'Refund'"></refund>
          </el-tab-pane>
          <el-tab-pane label="新增房产" name="AddBuilding">
            <add-building v-if="activeName === 'AddBuilding'"></add-building>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AgencyConsultant from '../components/checkManagement/AgencyConsultant.vue'
  import OwnerConsultant from '../components/checkManagement/OwnerConsultant.vue'
  import Refund from '../components/checkManagement/Refund.vue'
  import AddBuilding from '../components/checkManagement/AddBuilding.vue'
  export default {
    data () {
      return {
        activeName: 'AgencyConsultant'
      }
    },
    components: {
      AgencyConsultant,
      OwnerConsultant,
      Refund,
      AddBuilding
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
