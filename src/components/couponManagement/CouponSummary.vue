<template>
  <div id="CouponSummary">
    <div v-show="!showPopup">
      <!-- toolbar -->
      <el-row>
        <el-form :model="form">
          <el-col :span="4">
            <el-form-item label="类型：">
              <el-select v-model="form.smallType" @change="optionChange">
                <el-option label="全部" value=""></el-option>
                <el-option label="偷听优惠券" value="1"></el-option>
                <el-option label="问答优惠券" value="2"></el-option>
                <el-option label="约见优惠券" value="3"></el-option>
                <el-option label="踩盘优惠券" value="4"></el-option>
                <el-option label="方案优惠券" value="5"></el-option>
                <el-option label="定制优惠券" value="6"></el-option>
                <el-option label="通用优惠券" value="7"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="发放方式：">
              <el-select v-model="form.bigType" @change="optionChange">
                <el-option label="全部" value=""></el-option>
                <el-option label="注册" value="1"></el-option>
                <el-option label="活动" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="状态：">
              <el-select v-model="form.state" @change="optionChange">
                <el-option label="全部" value=""></el-option>
                <el-option label="未使用" value="1"></el-option>
                <el-option label="已使用" value="2"></el-option>
                <el-option label="失效券" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" @change="optionChange"></el-date-picker>
              —
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" @change="optionChange"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <!-- table -->
      <el-table :data="tableDatas" resizable>
        <el-table-column label="订单编号" align="center">
          <template scope="scope">
            <span v-if="scope.row.useDate" class="isLink" @click="jump(scope.row.orderId)">{{ scope.row.orderId }}</span>
            <span v-if="!scope.row.useDate">— —</span>
          </template>
        </el-table-column>
        <el-table-column label="使用日期" align="center">
          <template scope="scope">
            <span v-if="scope.row.useDate">{{ scope.row.useDate | dateFormat }}</span>
            <span v-if="!scope.row.useDate">— —</span>
          </template>
        </el-table-column>
        <el-table-column label="消费者名称" align="center">
          <template scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="优惠券类型" align="center">
          <template scope="scope">
            <span>{{ scope.row.smallType | couponType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发放方式" align="center">
          <template scope="scope">
            <span>{{ scope.row.bigType | distributionMode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template scope="scope">
            <span>{{ scope.row.status | userStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="优惠金额" align="center">
          <template scope="scope">
            <span>￥ {{ scope.row.youhuiAmount/100.0 }}</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row class="pagination">
        <el-col :span="24">
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize">
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <!-- 弹出层(偷听) -->
    <el-row class="popup" v-if="showPopup && orderDetails.type === 1">
      <el-col :span="15">
        <p class="close"><i class="iconfont icon-guanbi" @click="colse()"></i></p>
      </el-col>
      <el-col class="showArea" :span="24">
        <el-col :span="15" style="padding: 10px">
          <div class="leftArea">
            <div class="userInfo">
              <h3>用户信息</h3>
              <div class="baseInfo">
                <p>姓名：<span>{{ orderDetails.userName }}</span></p>
              </div>
              <h3>服务详情</h3>
              <div class="serviceInfo">
                <p>顾问名称：<span>{{ orderDetails.guwenName }}</span></p>
                <p>顾问类型：<span>{{ orderDetails.guwenType | consultantType }}</span></p>
                <p>问题：<span>{{ orderDetails.question }}</span></p>
                <p>答案：
                  <span class="iconfont icon-laba2" v-if="orderDetails.answer" @click="playOrpause" style="cursor: pointer"></span>
                  <span v-if="!orderDetails.answer">无</span>
                  <audio id="audioName" controls="controls" style="display: none;">
                    <source :src="orderDetails.answer" type="audio/mpeg">
                  </audio>
                </p>
                <p>提问人：<span>{{ orderDetails.touting.questionName }}</span></p>
                <p>订单状态：<span>{{ orderDetails.status | orderStatus }}</span></p>
              </div>
            </div>
            <div class="payDetails">
              <h3>支付明细</h3>
              <p>应支付：<span v-if="servicePrice[0]">￥{{ servicePrice[0].price/100.0 }}</span></p>
              <p>实际支付：<span>￥{{ orderDetails.status === 1 ? orderDetails.payAmount/100.0 : '0' }}</span></p>
              <p>优惠：<span>￥{{ orderDetails.youhuiAmount ? orderDetails.youhuiAmount/100.0 : 0 }}</span></p>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>

    <!-- 详情层(问答) -->
    <el-row class="popup" v-if="showPopup && orderDetails.type === 2">
      <el-col :span="15">
        <p class="close"><i class="iconfont icon-guanbi" @click="colse()"></i></p>
      </el-col>
      <el-col class="showArea" :span="24">
        <el-col :span="15" style="padding: 10px">
          <div class="leftArea">
            <div class="userInfo">
              <h3>用户信息</h3>
              <div class="baseInfo">
                <p>姓名：<span>{{ orderDetails.userName }}</span></p>
              </div>
              <h3>服务详情</h3>
              <div class="serviceInfo">
                <p>顾问名称：<span>{{ orderDetails.guwenName }}</span></p>
                <p>顾问类型：<span>{{ orderDetails.guwenType | consultantType }}</span></p>
                <p>问题：<span>{{ orderDetails.question }}</span></p>
                <p>答案：
                  <span class="iconfont icon-laba2" v-if="orderDetails.answer" @click="playOrpause" style="cursor: pointer"></span>
                  <span v-if="!orderDetails.answer">无</span>
                  <audio id="audioName" controls="controls" style="display: none;">
                    <source :src="orderDetails.answer" type="audio/mpeg">
                  </audio>
                </p>
                <p>订单状态：<span>{{ orderDetails.status | orderStatus }}</span></p>
              </div>
            </div>
            <div class="payDetails">
              <h3>支付明细</h3>
              <p>应支付：<span v-if="servicePrice[orderDetails.type-1]">￥{{ servicePrice[orderDetails.type-1].price/100.0 }}</span></p>
              <p>实际支付：<span>￥{{ orderDetails.status === 1 ? '0' : orderDetails.payAmount/100.0 }}</span></p>
              <p>优惠：<span>￥{{ orderDetails.youhuiAmount ? orderDetails.youhuiAmount/100.0 : 0 }}</span></p>
              <p v-if="orderDetails.status === 6">退款金额：<span>￥{{ orderDetails.payAmount/100.0 }}</span></p>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>

    <!-- 详情层（约见、方案） -->
    <el-row class="popup" v-if="(showPopup && orderDetails.type === 3) || (showPopup && orderDetails.type === 5)">
      <el-col :span="15">
        <p class="close"><i class="iconfont icon-guanbi" @click="colse()"></i></p>
      </el-col>
      <el-col class="showArea" :span="24">
        <el-col :span="15" style="padding: 10px">
          <div class="leftArea">
            <div class="userInfo">
              <h3>用户信息</h3>
              <div class="baseInfo">
                <p>姓名：<span>{{ orderDetails.name }}</span></p>
                <p>联系方式：<span>{{ orderDetails.phone }}</span></p>
                <p>我的需求：<span>{{ orderDetails.myneed }}</span></p>
                <p>我的实际情况：<span>{{ orderDetails.myactual }}</span></p>
              </div>
              <h3>服务详情</h3>
              <div class="serviceInfo">
                <p>顾问名称：<span>{{ orderDetails.guwenName }}</span></p>
                <p>顾问类型：<span>{{ orderDetails.guwenType | consultantType }}</span></p>
                <p v-if="orderDetails.type === 3">见面约谈90分钟<span v-if="servicePrice[orderDetails.type-1]">￥{{ servicePrice[orderDetails.type-1].price/100.0 }}</span></p>
                <p>订单状态：<span>{{ orderDetails.status | orderStatus }}</span></p>
              </div>
            </div>
            <div class="payDetails">
              <h3>支付明细</h3>
              <p>应支付：<span v-if="servicePrice[orderDetails.type-1]">￥{{ servicePrice[orderDetails.type-1].price/100.0 }}</span></p>
              <p>实际支付：<span>￥{{ orderDetails.status === 1 ? '0' : orderDetails.payAmount/100.0 }}</span></p>
              <p>优惠：<span>￥{{ orderDetails.youhuiAmount ? orderDetails.youhuiAmount/100.0 : 0 }}</span></p>
              <p v-if="orderDetails.status === 6">退款金额：<span>￥{{ orderDetails.payAmount/100.0 }}</span></p>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>

    <!-- 详情层(踩盘、定制) -->
    <el-row class="popup" v-if="(showPopup && orderDetails.type === 4) || (showPopup && orderDetails.type === 6)">
      <el-col :span="15">
        <p class="close"><i class="iconfont icon-guanbi" @click="colse()"></i></p>
      </el-col>
      <el-col class="showArea" :span="24">
        <el-col :span="15" style="padding: 10px">
          <div class="leftArea">
            <div class="userInfo">
              <h3>用户信息</h3>
              <div class="baseInfo">
                <p>姓名：<span>{{ orderDetails.name }}</span></p>
                <p>联系方式：<span>{{ orderDetails.phone }}</span></p>
                <p>我的需求：<span>{{ orderDetails.myneed }}</span></p>
                <p>我的实际情况：<span>{{ orderDetails.myactual }}</span></p>
              </div>
              <h3>服务详情</h3>
              <div class="serviceInfo">
                <p>顾问名称：<span>{{ orderDetails.guwenName }}</span></p>
                <p>顾问类型：<span>{{ orderDetails.guwenType | consultantType }}</span></p>
                <p>楼盘名称：<span v-if="">{{ orderDetails.buildingInfo.building }}</span></p>
                <p>楼盘地址：<span>{{ orderDetails.buildingInfo.address }}</span></p>
                <p v-if="orderDetails.type === 4">陪同踩盘90分钟<span v-if="servicePrice[orderDetails.type-1]">￥{{ servicePrice[orderDetails.type-1].price/100.0 }}</span></p>
                <p>订单状态：<span>{{ orderDetails.status | orderStatus }}</span></p>
              </div>
            </div>
            <div class="payDetails">
              <h3>支付明细</h3>
              <p>应支付：<span v-if="servicePrice[orderDetails.type-1]">￥{{ servicePrice[orderDetails.type-1].price/100.0 }}</span></p>
              <p>实际支付：<span>￥{{ orderDetails.status === 1 ? '0' : orderDetails.payAmount/100.0 }}</span></p>
              <p>优惠：<span>￥{{ orderDetails.youhuiAmount ? orderDetails.youhuiAmount/100.0 : 0 }}</span></p>
              <p v-if="orderDetails.status === 6">退款金额：<span>￥{{ orderDetails.payAmount/100.0 }}</span></p>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import dateFormat from '../../utils/dateFormat.js'
  import consultantType from '../../utils/consultantType.js'
  import orderStatus from '../../utils/orderStatus.js'
  import couponType from '../../utils/couponType.js'
  export default {
    data () {
      return {
        form: {
          state: '',
          smallType: '',
          bigType: '',
          date1: '',
          date2: ''
        },
        currentPage: 1,
        pageSize: 10,
        totalSize: 0,
        tableDatas: [],
        showPopup: false,
        orderDetails: {}
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      // 点击编号跳转
      jump (id) {
        this.showPopup = true
        this.axios({
          method: 'get',
          url: '/yewen/admin/order/orderInfo',
          params: {
            orderId: id
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.orderDetails = result.data
            this.servicePrice = result.data.servicePrice
          } else {
            this.$message({
              message: result.data.msg,
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      colse () {
        this.showPopup = false
      },
      // 获取成为中介顾问列表数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/youhui/list',
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            status: this.form.state,
            smallType: this.form.smallType,
            bigType: this.form.bigType,
            startDate: this.form.date1,
            endDate: this.form.date2
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.tableDatas = result.data.data.list
            this.totalSize = result.data.data.totalCount
          } else {
            this.$message({
              message: result.data.msg,
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      // 改变每页条数
      sizeChange (val) {
        this.pageSize = val
        this.getDatas()
      },
      currentChange (val) {
        this.currentPage = val
        this.getDatas()
      },
      optionChange () {
        this.getDatas()
      },
      // 冻结
      edit (id) {
        this.axios({
          method: 'post',
          url: '/yewen/admin/userManage/updateStatus',
          params: {
            status: 2,
            userId: id
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.$message({
              message: result.data.msg,
              type: 'success'
            })
            this.getDatas()
          } else {
            this.$message({
              message: result.data.msg,
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      // 解冻
      del (id) {
        this.axios({
          method: 'post',
          url: '/yewen/admin/userManage/updateStatus',
          params: {
            status: 1,
            userId: id
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.$message({
              message: result.data.msg,
              type: 'success'
            })
            this.getDatas()
          } else {
            this.$message({
              message: result.data.msg,
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    filters: {
      dateFormat,
      consultantType,
      orderStatus,
      couponType,
      distributionMode (value) {
        switch (value) {
          case 1:
            return '注册'
          case 2:
            return '活动'
        }
      },
      userStatus (value) {
        switch (value) {
          case 1:
            return '未使用'
          case 2:
            return '已使用'
          case 3:
            return '失效券'
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  .isLink{
    cursor: pointer;
    &:hover{
      color: #20a0ff;
    }
  }
  .el-select{
    max-width: 120px;
  }
  .el-input{
    max-width: 120px
  }
  .search{
    max-width: 300px
  }
  .pagination{
    margin-top: 15px;
    /*text-align: center;*/
  }

  /* 详情弹窗*/
  .popup{
    width: 100%;
    background: #eef1f6;
    padding: 20px;
    /*position: absolute;*/
    /*top: 0;*/
    /*bottom: 0;*/
    .close{
      text-align: right;
      i{
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  .leftArea{
    padding: 10px 20px;
    background: #fff;
    .userInfo{
      border: 1px solid #eef1f6;
      h3{
        background: #eef1f6;
        line-height: 35px;
        text-indent: 10px;
      }
      .baseInfo{
        border-bottom: 1px solid #eef1f6;
        p{
          line-height: 35px;
          padding: 0 10px;
          span{
            float: right;
          }
        }
      }
      .serviceInfo{
        p{
          line-height: 35px;
          padding: 0 10px;
          span{
            float: right;
          }
        }
      }
    }
    .payDetails{
      border: 1px solid #eef1f6;
      h3{
        background: #eef1f6;
        line-height: 35px;
        text-indent: 10px;
      }
      p{
        line-height: 35px;
        padding: 0 10px;
        span{
          float: right;
        }
      }
    }
  }

</style>
