<template>
  <div id="SetServicePrice">
    <!-- toolbar -->
    <el-row class="">
      <el-col :span="18">
        <!-- table -->
        <el-table :data="servicePriceDatas" resizable>
          <el-table-column label="服务类型" align="center">
            <template scope="scope">
              <span>{{ scope.row.type | orderType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="服务价格" align="center">
            <template scope="scope">
              <div v-if="!enableEdit">
                <span>{{ scope.row.price }}</span>元
              </div>
              <div v-if="enableEdit">
                <input class="service" type="text" v-model="scope.row.price" value=""> 元
              </div>
            </template>
          </el-table-column>
          <el-table-column label="平台" align="center">
            <template scope="scope">
              <div v-if="!enableEdit">
                <span>{{ scope.row.platform }}</span>%
              </div>
              <div v-if="enableEdit">
                <input class="service" type="text" v-model="scope.row.platform" value="">%
              </div>
            </template>
          </el-table-column>
          <el-table-column label="顾问" align="center">
            <template scope="scope">
              <div v-if="!enableEdit">
                <span>{{ scope.row.guwen }}</span>%
              </div>
              <div v-if="enableEdit">
                <input class="service" type="text" v-model="scope.row.guwen" value="">%
              </div>
            </template>
          </el-table-column>
          <el-table-column label="用户" align="center">
            <template scope="scope">
              <div v-if="!enableEdit">
                <span>{{ scope.row.user }}</span>%
              </div>
              <div v-if="enableEdit">
                <input class="service" type="text" v-model="scope.row.user" value="">%
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" v-show="editShow" @click="edit">编辑</el-button>
        <el-button type="success" v-show="!editShow" @click="confirm()">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import orderType from '../../utils/orderType.js'
  export default {
    data () {
      return {
        editShow: true,
        enableEdit: false,
        servicePriceDatas: []
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      edit () {
        this.editShow = false
        this.enableEdit = true
      },
      confirm () {
        this.editShow = true
        this.enableEdit = false
        let flag = true
        this.servicePriceDatas.forEach((item, index) => {
          console.log(parseFloat(item.guwen) + parseFloat(item.platform) + parseFloat(item.user) === 100)
          if ((parseFloat(item.guwen) + parseFloat(item.platform) + parseFloat(item.user)) !== 100) {
            flag = false
          }
        })
        if (flag) {
          let temp = this.servicePriceDatas
          temp.forEach(item => {
            item.price *= 100
          })
          this.axios({
            method: 'post',
            url: '/yewen/admin/percent/update',
//          data: 'percent=' + JSON.stringify(this.servicePriceDatas)
            data: {
//              percent: JSON.stringify(this.servicePriceDatas)
              percent: JSON.stringify(temp)
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
        } else {
          this.$message({
            message: '请检查价格或分成比例是否正确！',
            type: 'warning'
          })
          this.getDatas()
        }
      },
      // 获取服务价格数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/percent/query'
        }).then((result) => {
          if (result.data.code === 0) {
            let temp = result.data.data
            temp.forEach(item => {
              item.price /= 100.0
            })
            this.servicePriceDatas = temp
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
      orderType
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  .el-button{
    margin-left: 0;
    margin-top: 15px;
  }
  .service{
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #eef1f6;
    display: inline-block;
    margin-right: 5px;
  }
  .el-input{
    max-width: 80px;
    margin-right: 5px;
    text-align: center;
  }
  .el-table__row:hover{
    background: #fff !important;
  }
</style>
