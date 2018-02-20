<template>
  <div id="cashManagement">
    <div>
      <!-- toolbar -->
      <el-row>
        <el-form :model="form">
          <el-col :span="4">
            <el-form-item label="状态：">
              <el-select v-model="form.state" @change="optionChange">
                <el-option label="全部" value=""></el-option>
                <el-option label="待审核" value="1"></el-option>
                <el-option label="审核未通过" value="3"></el-option>
                <el-option label="审核通过" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="类型：">
              <el-select v-model="form.type" @change="optionChange">
                <el-option label="全部" value=""></el-option>
                <el-option label="普通用户" value="0"></el-option>
                <el-option label="中介顾问" value="1"></el-option>
                <el-option label="业主顾问" value="2"></el-option>
                <el-option label="大咖顾问" value="3"></el-option>
                <el-option label="金牌顾问" value="4"></el-option>
                <el-option label="资深顾问" value="5"></el-option>
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
          <el-col :span="8">
            <el-input class="search" placeholder="编号、申请人" v-model="form.searchVaule">
              <el-button slot="append" icon="search" @click="optionChange"></el-button>
            </el-input>
          </el-col>
        </el-form>
      </el-row>

      <!-- table -->
      <el-table :data="tableDatas" resizable>
        <el-table-column label="编号" align="center">
          <template scope="scope">
            <span>{{ scope.row.tixianId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现时间" align="center">
          <template scope="scope">
            <span>{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template scope="scope">
            <span>{{ scope.row.guwenType | consultantType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请人" align="center">
          <template scope="scope">
            <span>{{ scope.row.applyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请人电话" align="center">
          <template scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现金额" align="center">
          <template scope="scope">
            <span>￥ {{ scope.row.amount/100.0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button size="small" :disabled="scope.row.status > 1" type="success" @click="edit(scope.row)">通过</el-button>
            <el-button size="small" :disabled="scope.row.status > 1" type="warning" @click="del(scope.row)">驳回</el-button>
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

  </div>
</template>

<script>
  import dateFormat from '../../utils/dateFormat.js'
  import consultantType from '../../utils/consultantType.js'
  export default {
    data () {
      return {
        form: {
          state: '',
          type: '',
          date1: '',
          date2: '',
          searchVaule: ''
        },
        currentPage: 1,
        pageSize: 10,
        totalSize: 0,
        tableDatas: []
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      // 获取提现管理列表数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/tixian',
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            status: this.form.state,
            type: this.form.type,
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
      // 审核通过
      edit (info) {
        this.axios({
          method: 'post',
          url: '/yewen/admin/tixian/ispass',
          params: {
            status: 2,
            tixianId: info.tixianId
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
      // 驳回
      del (info) {
        this.axios({
          method: 'post',
          url: '/yewen/admin/tixian/ispass',
          params: {
            status: 3,
            tixianId: info.tixianId
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
      consultantType
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

</style>
