<template>
  <div id="CheckManage">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="系统消息" name="first">
            <system-message></system-message>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import SystemMessage from '../components/messagePush/SystemMessage.vue'
  export default {
    data () {
      return {
        activeName: 'first'
      }
    },
    components: {
      SystemMessage
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
