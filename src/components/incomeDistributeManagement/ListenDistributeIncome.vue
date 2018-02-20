<template>
  <div id="ListenDistributeIncome">
    <div v-show="!showPopup">
      <!-- toolbar -->
      <el-row>
        <el-form :model="form">
          <el-col :span="8">
            <el-form-item label="日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" @change="optionChange"></el-date-picker>
              —
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" @change="optionChange"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-input class="search" placeholder="订单编号、问答用户名、偷听用户名" v-model="form.searchVaule">
              <el-button slot="append" icon="search" @click="optionChange"></el-button>
            </el-input>
          </el-col>
        </el-form>
      </el-row>

      <!-- table -->
      <el-table :data="tableDatas" resizable>
        <el-table-column label="订单编号">
          <template scope="scope">
            <span class="isLink" @click="jump(scope.row.orderId)">{{ scope.row.orderId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日期">
          <template scope="scope">
            <span>{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提问用户名称">
          <template scope="scope">
            <span>{{ scope.row.toutingFrom }}</span>
          </template>
        </el-table-column>
        <el-table-column label="偷听用户名称">
          <template scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务金额">
          <template scope="scope">
            <span>￥ {{ scope.row.servicePrice.price/100.0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="平台分成">
          <template scope="scope">
            <span>￥ {{ scope.row.platformAmount/100.0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="顾问分成">
          <template scope="scope">
            <span>￥ {{ scope.row.guwenAmount/100.0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提问用户分成">
          <template scope="scope">
            <span>￥ {{ scope.row.userAmount/100.0 }}</span>
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
    <el-row class="popup" v-if="showPopup">
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
  </div>
</template>

<script>
  import dateFormat from '../../utils/dateFormat.js'
  import orderType from '../../utils/orderType.js'
  import orderStatus from '../../utils/orderStatus.js'
  import consultantType from '../../utils/consultantType.js'
  export default {
    data () {
      return {
        form: {
          date1: '',
          date2: '',
          searchVaule: ''
        },
        currentPage: 1,
        pageSize: 10,
        totalSize: 0,
        tableDatas: [],
        showPopup: false,
        orderDetails: {
          touting: {}
        },
        servicePrice: []
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
      // 答案播放
      playOrpause () {
        let audioName = document.getElementById('audioName')
        if (this.playFlag) {
          audioName.load()  // 重新加载重头播放
          audioName.play()
          this.playFlag = false
        } else {
          audioName.pause()
          this.playFlag = true
        }
      },
      // 获取问答订单数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/percent/service',
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            type: 1,
            startDate: this.form.date1,
            endDate: this.form.date2,
            keyword: this.form.searchVaule.trim()
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
      }
    },
    filters: {
      dateFormat,
      orderType,
      orderStatus,
      consultantType
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  #ServiceDistributeIncome{

  }
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

