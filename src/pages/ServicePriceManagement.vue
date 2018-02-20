<template>
  <div id="CheckManage">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="服务价格设定" name="SetServicePrice">
            <set-service-price v-if="activeName === 'SetServicePrice'"></set-service-price>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import SetServicePrice from '../components/servicePriceManagement/SetServicePrice.vue'
  export default {
    data () {
      return {
        activeName: 'SetServicePrice'
      }
    },
    components: {
      SetServicePrice
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
