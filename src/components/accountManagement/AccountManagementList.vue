<template>
  <div id="accountManagementList">
    <!-- toolbar -->
    <el-row class="" v-show="!showPopup">
      <el-col :span="18">
        <el-button type="primary" class="addBtn" @click="add">添加</el-button>

        <!-- table -->
        <el-table :data="accountDatas" resizable>
          <el-table-column label="姓名" align="center">
            <template scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="身份" align="center">
            <template scope="scope">
              <span>{{ scope.row.roleName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账号" align="center">
            <template scope="scope">
              <span>{{ scope.row.account }}</span>
            </template>
          </el-table-column>
          <el-table-column label="密码" align="center">
            <template scope="scope">
              <span>{{ scope.row.password }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template scope="scope">
              <el-button type="primary" size="small"@click="modifyAccount(scope.row.userId)">修改</el-button>
              <el-button type="warning" size="small" :disabled="scope.row.role==0" @click="delAccount(scope.row.userId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 账户新增弹窗 -->
    <el-row class="popup" v-if="showPopup">
      <el-col :span="14">
        <p class="close"><i class="iconfont icon-guanbi" @click="close()"></i></p>
      </el-col>
      <el-col :span="12" style="padding: 10px;">
        <el-form label-width="80px" :model="form">
          <el-form-item label="账号">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="身份">
            <el-input v-model="form.identity"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" v-show="!modifyAndAdd" @click="register">新增</el-button>
          <el-button type="primary" v-show="modifyAndAdd" @click="confirmModify">修改</el-button>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        accountDatas: [],
        scope: 0,
        showPopup: false,
        modifyAndAdd: true,
        form: {
          account: '',
          name: '',
          password: '',
          identity: '',
          userId: '',
          role: ''
        }
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      // 新增用户弹窗
      add () {
        this.showPopup = true
        this.modifyAndAdd = false
        this.account = ''
        this.name = ''
        this.password = ''
        this.identity = ''
      },
      // 关闭按钮
      close () {
        this.showPopup = false
      },
      // 获取全部用户数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/ywuser/list'
        }).then((result) => {
          if (result.data.code === 0) {
            this.accountDatas = result.data.data.list
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      // 注册用户确认事件
      register () {
        this.axios({
          method: 'post',
          url: '/yewen/admin/ywuser/save',
          params: {
            account: this.form.account,
            name: this.form.name,
            password: this.form.password,
            roleName: this.form.identity,
            role: 1
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.$message({
              message: result.data.msg,
              type: 'success'
            })
            this.showPopup = false
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
      // 删除账户
      delAccount (id) {
        this.$confirm('确认删除该账户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            method: 'DELETE',
            url: '/yewen/admin/ywuser/delete',
            params: {
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 修改账号弹窗
      modifyAccount (id) {
        this.showPopup = true
        this.modifyAndAdd = true
        this.axios({
          method: 'get',
          url: '/yewen/admin/ywuser/info',
          params: {
            userId: id
          }
        }).then((result) => {
          this.showPopup = true
          if (result.data.code === 0) {
            this.form.account = result.data.ywUser.account
            this.form.name = result.data.ywUser.name
            this.form.password = result.data.ywUser.password
            this.form.identity = result.data.ywUser.roleName
            this.form.userId = result.data.ywUser.userId
            this.form.role = result.data.ywUser.role
          } else {
            this.$message({
              message: '网络异常！',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      // 确认修改数据
      confirmModify () {
        this.axios({
          method: 'post',
          url: '/yewen/admin/ywuser/update',
          params: {
            account: this.form.account,
            name: this.form.name,
            password: this.form.password,
            roleName: this.form.identity,
            userId: this.form.userId,
            role: this.form.role
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.$message({
              message: result.data.msg,
              type: 'success'
            })
            this.showPopup = false
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
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  .addBtn{
    margin-bottom: 15px;
  }
  /* 详情弹窗*/
  .popup{
    width: 100%;
    background: #eef1f6;
    padding: 20px;
    .close{
      text-align: right;
      i{
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  .btn{
    margin-top: 35px;
    text-align: center;
    .el-button{
      width: 100px;
    }
  }
</style>
