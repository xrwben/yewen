<template>
  <div id="UserFeedbackInformation">
    <div>
      <!-- toolbar -->
      <el-row>
        <el-form>
          <el-col :span="24">
            <el-form-item label="反馈日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="date1" @change="optionChange"></el-date-picker>
              —
              <el-date-picker type="date" placeholder="选择日期" v-model="date2" @change="optionChange"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <!-- table -->
      <el-table :data="feedBackDatas" resizable>
        <el-table-column label="日期" align="center" width="120">
          <template scope="scope">
            <span>{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名称" align="center" width="120">
          <template scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户电话" align="center" width="200">
          <template scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="内容描叙">
          <template scope="scope">
            <span>{{ scope.row.feedback }}</span>
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
  export default {
    data () {
      return {
        showLoading: false,
        date1: '',
        date2: '',
        currentPage: 1,
        pageSize: 10,
        totalSize: 0,
        feedBackDatas: []
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      // 获取用户反馈信息数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/collectinfo/feedback',
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            startDate: this.date1,
            endDate: this.date2
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.feedBackDatas = result.data.data.list
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
      dateFormat
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
  .pagination{
    margin-top: 15px;
    /*text-align: center;*/
  }

</style>
