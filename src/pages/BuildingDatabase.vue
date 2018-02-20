<template>
  <div id="CheckManage">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="楼盘信息库" name="first">
            <building-information></building-information>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import BuildingInformation from '../components/buildingDatabase/BuildingInformation.vue'
  export default {
    data () {
      return {
        activeName: 'first'
      }
    },
    components: {
      BuildingInformation
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
