<template>
  <div id="Refund">
    <div v-show="!showPopup">
      <!-- toolbar -->
      <el-row>
        <el-form :model="form">
          <el-col :span="4">
            <el-form-item label="类别：">
              <el-select v-model="form.type" @change="optionChange">
                <el-option label="全部" value=""></el-option>
                <el-option label="偷听服务" value="1"></el-option>
                <el-option label="问答服务" value="2"></el-option>
                <el-option label="约见服务" value="3"></el-option>
                <el-option label="踩盘服务" value="4"></el-option>
                <el-option label="方案服务" value="5"></el-option>
                <el-option label="定制服务" value="6"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="状态：">
              <el-select v-model="form.state" @change="optionChange">
                <el-option label="全部" value=""></el-option>
                <el-option label="退款中" value="4"></el-option>
                <el-option label="拒绝退款" value="5"></el-option>
                <el-option label="退款成功" value="6"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" @change="optionChange"></el-date-picker>
              ——
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" @change="optionChange"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-input class="search" placeholder="订单编号、顾问名称、用户名称" v-model="form.searchVaule">
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
            <span>{{ scope.row.tuikuiTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务类别">
          <template scope="scope">
            <span>{{ scope.row.type | orderType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template scope="scope">
            <span>{{ scope.row.status | orderStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="顾问名称">
          <template scope="scope">
            <span>{{ scope.row.guwenName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名称">
          <template scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务金额">
          <template scope="scope">
            <span>￥ {{ scope.row.ServicePrice.price/100.0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="退款金额">
          <template scope="scope">
            <span>￥ {{ scope.row.payAmount/100.0 }}</span>
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

    <!-- 详情层 -->
    <el-row class="popup" v-if="showPopup">
      <el-col :span="15">
        <p class="close"><i class="iconfont icon-guanbi" @click="colse()"></i></p>
      </el-col>
      <el-col class="showArea" :span="24">
        <el-col :span="15" style="padding: 10px">
          <div class="leftArea">
            <div class="baseInfo display_box">
              <div class="pic">
                <img :src="refundDetails.user.headimgurl">
              </div>
              <div class="name">
                <h3>{{ refundDetails.userName }}</h3>
                <p>电话： {{ refundDetails.user.phone }}</p>
              </div>
            </div>
            <div class="serviceDetails">
              <p>服务顾问： {{ refundDetails.guwenName }} &emsp; {{ refundDetails.guwenType | consultantType }}</p>
              <p>订单编号： {{ refundDetails.orderId }}</p>
              <p>订单状态： {{ refundDetails.status | orderStatus }}</p>
              <p>日期： {{ refundDetails.createTime | dateFormat }}</p>
              <p>服务类型： {{ refundDetails.type | orderType }}</p>
              <p v-if="refundDetails.servicePrice[refundDetails.type-1]">服务金额： ￥ {{ refundDetails.servicePrice[refundDetails.type-1].price/100.0 }}</p>
              <p>支付记录： {{ refundDetails.payTime | timeFormat }} &emsp; ￥ {{ refundDetails.payAmount/100.0 }}</p>
            </div>
            <div class="refundNote">
              <p>申请退款金额： ￥ {{ refundDetails.payAmount/100.0 }}</p>
              <p>退款说明：</p>
              <p>{{ refundDetails.tuikuanNote }}</p>
            </div>
            <div class="btn">
              <el-button type="warning" :disabled="refundDetails.status === 5 || refundDetails.status === 6" @click="del(refundDetails.orderId)">驳回</el-button>
              <el-button type="primary" :disabled="refundDetails.status === 5 || refundDetails.status === 6" @click="edit(refundDetails.orderId)">通过</el-button>
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
        showLoading: false,
        form: {
          type: '',
          state: '',
          date1: '',
          date2: '',
          searchVaule: ''
        },
        currentPage: 1,
        pageSize: 10,
        totalSize: 0,
        tableDatas: [],
        showPopup: false,
        refundDetails: {
          servicePrice: [],
          user: {}
        }
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
            this.refundDetails = result.data
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
      // 获取退款列表数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/verify/tuikuan',
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            type: this.form.type,
            status: this.form.state,
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
      },
      // 退款通过
      edit (id) {
        this.axios({
          method: 'post',
          url: '/yewen/admin/verify/tuikuan/ispass',
          params: {
            status: 6,
            orderId: id
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.$message({
              message: result.data.msg,
              type: 'success'
            })
            this.getDatas()
            this.jump(id)
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
      // 驳回
      del (id) {
        this.axios({
          method: 'post',
          url: '/yewen/admin/verify/tuikuan/ispass',
          params: {
            status: 5,
            orderId: id
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.$message({
              message: result.data.msg,
              type: 'success'
            })
            this.getDatas()
            this.jump(id)
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
      orderType,
      orderStatus,
      consultantType,
      timeFormat (value) {
        let year = new Date(value).getFullYear() || 0
        let month = (new Date(value).getMonth() + 1 || 0) < 10 ? '0' + (new Date(value).getMonth() + 1 || 0) : (new Date(value).getMonth() + 1 || 0)
        let date = (new Date(value).getDate() || 0) < 10 ? '0' + (new Date(value).getDate() || 0) : (new Date(value).getDate() || 0)
        let hour = (new Date(value).getHours() || 0) < 10 ? '0' + (new Date(value).getHours() || 0) : (new Date(value).getHours() || 0)
        let minute = (new Date(value).getMinutes() || 0) < 10 ? '0' + (new Date(value).getMinutes() || 0) : (new Date(value).getMinutes() || 0)
        let second = (new Date(value).getSeconds() || 0) < 10 ? '0' + (new Date(value).getSeconds() || 0) : (new Date(value).getSeconds() || 0)
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
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
    .baseInfo{
      padding: 20px 0;
      border-bottom: 1px solid #eef1f6;
      .pic{
        width: 80px;
        height: 80px;
        border: 2px solid #eef1f6;
        border-radius: 5px;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .name{
        padding-left: 20px;
        h3{
          line-height: 45px;
        }
      }
    }
    .serviceDetails{
      padding: 20px 0;
      border-bottom: 1px solid #eef1f6;
      p{
        line-height: 35px;
      }
    }
    .refundNote{
      padding: 20px 0;
      p{
        line-height: 35px;
      }
    }
  }
</style>
