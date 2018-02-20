<template>
  <div id="CheckManage">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="活动消息" name="first">
            <active-message></active-message>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ActiveMessage from '../components/activePush/ActiveMessage.vue'
  export default {
    data () {
      return {
        activeName: 'first'
      }
    },
    components: {
      ActiveMessage
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
