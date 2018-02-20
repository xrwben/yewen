<template>
  <div id="OrderManage">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="偷听服务" name="Listen">
            <listen v-if="activeName === 'Listen'"></listen>
          </el-tab-pane>
          <el-tab-pane label="问答服务" name="QuestionAnswer">
            <question-answer v-if="activeName === 'QuestionAnswer'"></question-answer>
          </el-tab-pane>
          <el-tab-pane label="约见服务" name="Meet">
            <meet v-if="activeName === 'Meet'"></meet>
          </el-tab-pane>
          <el-tab-pane label="踩盘服务" name="TreadPlate">
            <tread-plate v-if="activeName === 'TreadPlate'"></tread-plate>
          </el-tab-pane>
          <el-tab-pane label="方案服务" name="Plan">
            <plan v-if="activeName === 'Plan'"></plan>
          </el-tab-pane>
          <el-tab-pane label="定制服务" name="CustomMade">
            <custom-made v-if="activeName === 'CustomMade'"></custom-made>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import QuestionAnswer from '../components/orderManagement/QuestionAnswer.vue'
  import Listen from '../components/orderManagement/Listen.vue'
  import Meet from '../components/orderManagement/Meet.vue'
  import TreadPlate from '../components/orderManagement/TreadPlate.vue'
  import CustomMade from '../components/orderManagement/CustomMade.vue'
  import Plan from '../components/orderManagement/Plan.vue'
  export default {
    data () {
      return {
        activeName: 'Listen'
      }
    },
    components: {
      QuestionAnswer,
      Listen,
      Meet,
      TreadPlate,
      CustomMade,
      Plan
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
