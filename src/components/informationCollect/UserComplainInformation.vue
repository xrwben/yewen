<template>
  <div id="UserComplainInformation">
    <div>
      <!-- toolbar -->
      <el-row>
        <el-form :model="form">
          <el-col :span="5">
            <el-form-item label="类型：">
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
          <el-col :span="8">
            <el-form-item label="投诉日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" @change="optionChange"></el-date-picker>
              —
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" @change="optionChange"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-input class="search" placeholder="编号、顾问名称、用户名称" v-model="form.searchVaule">
              <el-button slot="append" icon="search" @click="optionChange"></el-button>
            </el-input>
          </el-col>
        </el-form>
      </el-row>

      <!-- table -->
      <el-table :data="complainDatas" resizable>
        <el-table-column label="编号" align="center" width="120">
          <template scope="scope">
            <span>{{ scope.row.orderId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日期" align="center" width="120">
          <template scope="scope">
            <span>{{ scope.row.tousuTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" width="120">
          <template scope="scope">
            <span>{{ scope.row.type | orderType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="顾问名称" align="center" width="120">
          <template scope="scope">
            <span>{{ scope.row.guwenName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名称" align="center" width="120">
          <template scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="内容描叙">
          <template scope="scope">
            <span>{{ scope.row.tousu }}</span>
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
  import orderType from '../../utils/orderType.js'
  export default {
    data () {
      return {
        form: {
          type: '',
          date1: '',
          date2: '',
          searchVaule: ''
        },
        currentPage: 1,
        pageSize: 10,
        totalSize: 0,
        complainDatas: []
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      // 获取用户投诉信息数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/collectinfo/tousu',
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            type: this.form.type,
            startDate: this.form.date1,
            endDate: this.form.date2,
            keyword: this.form.searchVaule.trim()
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.complainDatas = result.data.data.list
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
      orderType
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

</style>
