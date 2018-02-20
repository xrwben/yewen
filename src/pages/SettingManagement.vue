<template>
  <div id="CheckManage">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="关于我们" name="AboutMe">
            <about-me v-if="activeName === 'AboutMe'"></about-me>
          </el-tab-pane>
          <el-tab-pane label="免责协议" name="DisClaimer">
            <dis-claimer v-if="activeName === 'DisClaimer'"></dis-claimer>
          </el-tab-pane>
          <el-tab-pane label="服务说明" name="ServiceNote">
            <service-note v-if="activeName === 'ServiceNote'"></service-note>
          </el-tab-pane>
          <el-tab-pane label="提现说明" name="DrawCashNote">
            <draw-cash-note v-if="activeName === 'DrawCashNote'"></draw-cash-note>
          </el-tab-pane>
          <el-tab-pane label="标签管理" name="TagManagement">
            <tag-management v-if="activeName === 'TagManagement'"></tag-management>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AboutMe from '../components/settingManagement/AboutMe.vue'
  import DisClaimer from '../components/settingManagement/DisClaimer.vue'
  import ServiceNote from '../components/settingManagement/ServiceNote.vue'
  import DrawCashNote from '../components/settingManagement/DrawCashNote.vue'
  import TagManagement from '../components/settingManagement/TagManagement.vue'
  export default {
    data () {
      return {
        activeName: 'AboutMe'
      }
    },
    components: {
      AboutMe,
      DisClaimer,
      ServiceNote,
      DrawCashNote,
      TagManagement
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
