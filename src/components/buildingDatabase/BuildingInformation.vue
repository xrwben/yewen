<template>
  <div id="BuildingInformation">
    <!-- toolbar -->
    <el-row>
      <el-form :model="form">
        <el-col :span="10">
          <el-form-item label="楼盘地址：">
            <el-select v-model="form.province" @change="changeProvince">
              <el-option :label="province" :value="province" v-for="province in provincesArray"></el-option>
            </el-select>
            <el-select v-model="form.city" @change="changeCity">
              <el-option :label="city" :value="city" v-for="city in citysArray"></el-option>
            </el-select>
            <el-select v-model="form.county" @change="optionChange">
              <el-option :label="county" :value="county" v-for="county in countysArray"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-input class="search" placeholder="编号、楼盘名称" v-model="form.searchVaule">
            <el-button slot="append" icon="search" @click="optionChange"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" class="uploadDownload">
          <el-upload
            class="upload"
            action="/yewen/admin/building/importBuildings"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :show-file-list= false
            :on-success="onSuccess">
            <el-button type="primary">导入</el-button>
          </el-upload>
          <a class="downLoad" href="/yewen/admin/building/export">导出</a>
        </el-col>
      </el-form>
    </el-row>

    <!-- table -->
    <el-table :data="tableData" resizable border>
      <el-table-column label="编号" width="200">
        <template scope="scope">
          <span>{{ scope.row.buildingId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="楼盘名称"  width="200">
        <template scope="scope">
          <span>{{ scope.row.building }}</span>
        </template>
      </el-table-column><el-table-column label="详细地址">
      <template scope="scope">
        <span>{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.county }}{{ scope.row.address }}</span>
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
</template>

<script>
  import address from '../../../static/address3.json'
  export default {
    data () {
      return {
        form: {
          province: '',
          city: '',
          county: '',
          searchVaule: ''
        },
        provincesArray: Object.keys(address),
        citysArray: [],
        countysArray: [],
        currentPage: 1,
        pageSize: 10,
        totalSize: 0,
        tableData: []
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      // 获取中介顾问数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/building/list',
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            province: this.form.province,
            city: this.form.city,
            county: this.form.county,
            keyword: this.form.searchVaule
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.tableData = result.data.page.list
            this.totalSize = result.data.page.totalCount
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
      // 导入
      onSuccess (response) {
        if (response.code === 0) {
          this.$message({
            message: '导入成功！',
            type: 'success'
          })
        }
        if (response.code === 500) {
          this.$message({
            message: response.msg,
            type: 'error'
          })
        }
      },
      // 省市区联动
      changeProvince () {
        this.citysArray = Object.keys(address[this.form.province])
        this.form.city = this.citysArray[0]
        this.countysArray = address[this.form.province][this.form.city]
        this.form.county = this.countysArray[0]
        this.getDatas()
      },
      changeCity () {
        this.countysArray = address[this.form.province][this.form.city]
        this.form.county = this.countysArray[0]
        this.getDatas()
      }
    }
  }
</script>

<style>
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
  .upload{
    display: inline-block;
  }
  .downLoad{
    background: #20a0ff;
    padding: 10px 15px;
    color: #fff;
    border-radius: 4px;
  }
</style>
