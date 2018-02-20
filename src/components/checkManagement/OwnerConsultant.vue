<template>
  <div id="ownerConsultant">
    <div v-show="!showPopup && !showConfirm">
      <!-- toolbar -->
      <el-row>
        <el-form :model="form">
          <el-col :span="5">
            <el-form-item label="状态：">
              <el-select v-model="form.state" @change="optionChange">
                <el-option label="全部" value=""></el-option>
                <el-option label="待审核" value="1"></el-option>
                <el-option label="审核未通过" value="2"></el-option>
                <el-option label="审核通过" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" @change="optionChange"></el-date-picker>
              —
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" @change="optionChange"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-input class="search" placeholder="编号、顾问名称" v-model="form.searchVaule">
              <el-button slot="append" icon="search" @click="optionChange"></el-button>
            </el-input>
          </el-col>
        </el-form>
      </el-row>

      <!-- table -->
      <el-table :data="tableDatas" resizable>
        <el-table-column label="顾问编号" align="center">
          <template scope="scope">
            <span class="isLink" @click="jump(scope.row.guwenId)">{{ scope.row.guwenId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" align="center">
          <template scope="scope">
            <span>{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="顾问名称" align="center">
          <template scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微信号码" align="center">
          <template scope="scope">
            <span>{{ scope.row.weixin }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" align="center">
          <template scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button size="small" :disabled="scope.row.ispass > 1" type="success" @click="edit(scope.row)">通过</el-button>
            <el-button size="small" :disabled="scope.row.ispass > 1" type="warning" @click="del(scope.row)">驳回</el-button>
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
      <p class="close"><i class="iconfont icon-guanbi" @click="colse()"></i></p>
      <el-col class="showArea" :span="24">
        <el-col :span="12" style="padding: 10px">
          <div class="leftArea">
            <div class="baseInfo display_box">
              <div class="pic">
                <img :src="consultantDetails.imgurl">
              </div>
              <div class="name">
                <h3>{{ consultantDetails.nickname }}</h3>
                <p>注册时间： {{ consultantDetails.createTime | dateFormat }}</p>
              </div>
            </div>
            <div class="detalisInfo">
              <p>微信：{{ consultantDetails.weixin }}</p>
              <p>联系电话：{{ consultantDetails.phone }}</p>
              <p>简介：{{ consultantDetails.introduce }}</p>
              <p>技能标签：{{ consultantDetails.labels }}</p>
            </div>
            <div class="buildingInfo">
              <div class="buildingName" v-for="(build, index) in consultantDetails.buildings">
                <p>{{ index+1 }}.楼盘信息</p>
                <p>{{ build.building }}</p>
                <p><span>{{ build.province }}</span> - <span>{{ build.city }}</span> - <span>{{ build.county }}</span></p>
                <p>{{ build.address }}</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12"  style="padding: 10px" v-if="consultantDetails.images">
          <div class="rightArea">
            <h3>证件信息</h3>
            <div class="idCard">
              <div class="img" v-for="pic in consultantDetails.cardPics">
                <img :src="pic">
              </div>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>

    <!-- 顾问类型和服务范围弹出层 -->
    <el-row class="popup" v-if="showConfirm">
      <el-col :span="12">
        <p class="close"><i class="iconfont icon-guanbi" @click="colse()"></i></p>
      </el-col>
      <el-col class="showArea" :span="24">
        <el-col :span="12" style="padding: 10px">
          <div class="leftArea">
            <div class="infos">
              <div class="picture">
                <img :src="confirmInfo.imgurl">
              </div>
              <h3>{{ confirmInfo.nickname }}</h3>
            </div>
            <div class="consultantType">
              <p>顾问类型：</p>
              <div>
                <label><input type="radio" v-model="consultantTypes" value="4">金牌顾问</label>
                <label><input type="radio" v-model="consultantTypes" value="5">资深顾问</label>
                <label><input type="radio" v-model="consultantTypes" value="3">大咖顾问</label>
              </div>
            </div>
            <div class="serviceRange">
              <p>服务范围：</p>
              <div>
                <label><input type="checkbox" v-model="serviceRange" value="问答"/>问答服务</label>
                <label><input type="checkbox" v-model="serviceRange" value="约见"/>约见服务</label>
                <label><input type="checkbox" v-model="serviceRange" value="踩盘"/>踩盘服务</label>
                <label><input type="checkbox" v-model="serviceRange" value="方案"/>方案服务</label>
                <label><input type="checkbox" v-model="serviceRange" value="定制"/>定制服务</label>
              </div>
            </div>
            <div class="btn">
              <el-button type="primary" @click="confirm">确定</el-button>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import dateFormat from '../../utils/dateFormat.js'
  export default {
    data () {
      return {
        form: {
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
        consultantDetails: {
          cardPics: []
        },
        showConfirm: false,
        confirmInfo: {},
        consultantTypes: '',
        serviceRange: []
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
          url: '/yewen/admin/verify/guwen/info',
          params: {
            guwenId: id
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.consultantDetails = result.data.data
            let tempArr = result.data.data.images
            this.consultantDetails.cardPics = tempArr.split(',')
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
        this.showConfirm = false
      },
      // 获取成为中介顾问列表数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/verify/yezhu',
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            ispass: this.form.state,
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
      // 审核通过弹窗
      edit (info) {
        this.showConfirm = true
        this.confirmInfo = info
      },
      // 审核确认通过
      confirm () {
        this.axios({
          method: 'post',
          url: '/yewen/admin/verify/yezhu/ispass',
          params: {
            ispass: 3,
            guwenId: this.confirmInfo.guwenId,
            phone: this.confirmInfo.phone,
            type: this.consultantTypes,
            scope: JSON.stringify(this.serviceRange)
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.$message({
              message: result.data.msg,
              type: 'success'
            })
            this.showConfirm = false
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
      // 驳回
      del (info) {
        this.axios({
          method: 'post',
          url: '/yewen/admin/verify/yezhu/ispass',
          params: {
            ispass: 2,
            guwenId: info.guwenId,
            phone: info.phone
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
      dateFormat
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
    .detalisInfo{
      padding: 20px 0;
      border-bottom: 1px solid #eef1f6;
      p{
        line-height: 35px;
      }
    }
    .buildingInfo{
      padding: 20px 0;
      .buildingName{
        padding-bottom: 10px;
        p{
          line-height: 35px;
        }
        p:not(:first-child){
          margin-left: 20px;
        }
      }
    }
  }
  .rightArea{
    padding: 10px 20px;
    background: #fff;
    h3{
      line-height: 35px;
    }
    .idCard{
      .img{
        box-flex: 1.0;
        width: 100%;
        img{
          width: 100%;
          min-width: 200px;
          max-width: 300px;
          height: 200px;
          display: block;
          border: 1px solid #eef1f6;
          margin-bottom: 5px;
          display: block;
        }
      }
    }
  }

  .infos{
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
    .picture{
      width: 100px;
      height: 100px;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    h3{
      text-align: center;
      margin-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }
  }
  .consultantType,.serviceRange{
    display: flex;
    padding: 35px 0 0;
    >p{
      width: 150px;
      box-flex: 1.0;
    }
    >div{
      width: 100%;
      box-flex: 1.0;
      label{
        margin-right: 50px;
        display: inline-block;
        line-height: 35px;
      }
    }
  }
  .btn{
    text-align: center;
    margin-top: 35px;
  }

</style>
