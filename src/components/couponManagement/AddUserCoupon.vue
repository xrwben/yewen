<template>
  <div id="AddNewCoupon">
    <div v-if="!showPopup">
      <!-- toolbar -->
      <el-row>
        <el-form>
          <el-col :span="4">
            <el-form-item label="类型：">
              <el-select v-model="type" @change="optionChange">
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
          <el-col :span="8">
            <el-form-item label="时间期限">
              <el-date-picker type="date" placeholder="选择日期" v-model="date1" @change="optionChange"></el-date-picker>
              —
              <el-date-picker type="date" placeholder="选择日期" v-model="date2" @change="optionChange"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" @click="showPublish()">发布</el-button>
          </el-col>
        </el-form>
      </el-row>

      <!-- table -->
      <el-table :data="couponDatas" resizable border>
        <el-table-column label="发布时间" align="center">
          <template scope="scope">
            <span>{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间期限" align="center">
          <template scope="scope">
            <span>{{ scope.row.startTime | dateFormat }} 至 {{ scope.row.endTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="优惠券类型" align="center">
          <template scope="scope">
            <span>{{ scope.row.smallType | couponType }}</span>
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

    <!-- 创建优惠券 -->
    <el-row class="popup" v-if="showPopup">
      <el-col :span="18">
        <p class="close"><i class="iconfont icon-guanbi" @click="close()"></i></p>
      </el-col>
      <el-col :span="24" style="padding: 10px;">
        <div class="dateRange display_box">
          <p>时间期限</p>
          <div>
            <el-date-picker type="date" placeholder="选择日期" v-model="time1"></el-date-picker>
            —
            <el-date-picker type="date" placeholder="选择日期" v-model="time2"></el-date-picker>
          </div>
        </div>
        <div class="couponType display_box">
          <p>优惠券类型</p>
          <div>
            <label><input type="radio" value="1" v-model="couponType">偷听优惠券</label>
            <label><input type="radio" value="2" v-model="couponType">问答优惠券</label>
            <label><input type="radio" value="3" v-model="couponType">约见优惠券</label>
            <label><input type="radio" value="4" v-model="couponType">踩盘优惠券</label>
            <label><input type="radio" value="5" v-model="couponType">方案优惠券</label>
            <label><input type="radio" value="6" v-model="couponType">定制优惠券</label>
            <label><input type="radio" value="7" v-model="couponType">通用优惠券</label>
          </div>
        </div>
        <div class="discountAmount display_box">
          <p>优惠金额</p>
          <div>
            <input class="money" type="text" v-model="money"> 元
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" @click="publish">确定</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import dateFormat from '../../utils/dateFormat.js'
  import couponType from '../../utils/couponType.js'
  export default {
    data () {
      return {
        type: '',
        date1: '',
        date2: '',
        currentPage: 1,
        pageSize: 10,
        totalSize: 0,
        couponDatas: [],
        showPopup: false,
        time1: '',
        time2: '',
        couponType: '',
        money: ''
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      // 获取优惠券列表数据
      getDatas () {
        this.axios({
          method: 'get',
          url: 'yewen/admin/youhui/youhuiList',
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            smallType: this.type,
            bigType: 1,
            startDate: this.date1,
            endDate: this.date2
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.couponDatas = result.data.data.list
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
      // 显示发布页面
      showPublish () {
        this.showPopup = true
        this.time1 = ''
        this.time2 = ''
        this.couponType = ''
        this.money = ''
      },
      // 确认发布
      publish () {
        console.log(this.time1 + this.time2 + this.couponType + this.money)
        if (this.time1 !== '' && this.time2 !== '' && this.couponType !== '' && this.money > '0') {
          this.axios({
            method: 'post',
            url: '/yewen/admin/youhui/save',
            data: {
              startTime: this.time1,
              endTime: this.time2,
              smallType: this.couponType,
              bigType: 1,
              youhuiAmount: this.money
            }
          }).then((result) => {
            if (result.data.code === 0) {
              this.$message({
                message: result.data.msg,
                type: 'success'
              })
              this.showPopup = false
              this.getDatas()
            } else if (result.data.code === 400) {
              this.$message({
                message: result.data.msg,
                type: 'error'
              })
            } else {
              this.$message({
                message: result.data.msg,
                type: 'error'
              })
            }
          }).catch((error) => {
            console.log(error)
          })
        } else {
          this.$message({
            message: '请填写完整的信息！',
            type: 'warning'
          })
        }
      },
      // 关闭按钮
      close () {
        this.showPopup = false
      }
    },
    filters: {
      dateFormat,
      couponType
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
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
  .dateRange,.couponType,.discountAmount{
    width: 100%;
    line-height: 35px;
    align-items: center;
    display: flex;
    margin-bottom: 15px;
    >p{
      width: 120px;
      display: block;
    }
    >div{
      label{
        margin-right: 15px;
      }
    }
  }
  .money{
    width: 60px;
    height: 35px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }

  .btn{
    margin-top: 35px;
    .el-button{
      width: 100px;
    }
  }
</style>
