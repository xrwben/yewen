<template>
  <div id="CheckManage">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="getDatas">
          <el-tab-pane label="优惠券统计" name="CouponSummary">
            <coupon-summary v-if="activeName === 'CouponSummary'"></coupon-summary>
          </el-tab-pane>
          <el-tab-pane label="创建新用户优惠券" name="AddUserCoupon">
            <add-user-coupon v-if="activeName === 'AddUserCoupon'"></add-user-coupon>
          </el-tab-pane>
          <el-tab-pane label="创建活动优惠券" name="AddActiveCoupon">
            <add-active-coupon v-if="activeName === 'AddActiveCoupon'"></add-active-coupon>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import CouponSummary from '../components/couponManagement/CouponSummary.vue'
  import AddUserCoupon from '../components/couponManagement/AddUserCoupon.vue'
  import AddActiveCoupon from '../components/couponManagement/AddActiveCoupon.vue'
  export default {
    data () {
      return {
        activeName: 'CouponSummary'
      }
    },
    components: {
      CouponSummary,
      AddUserCoupon,
      AddActiveCoupon
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
