<template>
  <div id="DrawCashNote">
    <el-row>
      <el-col :span="24">
        <div class="content">
          <textarea class="txt" v-model="content"></textarea>
          <p class="btn">
            <el-button type="primary" @click="save">保存</el-button>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        content: ''
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      // 获取数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/sysconfig/list',
          params: {
            configIds: '3'
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.content = result.data.page.list[0].content
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
      // 保存
      save () {
        console.log(this.imageUrl)
        this.axios({
          method: 'post',
          url: '/yewen/admin/sysconfig/update',
          data: {
            configId: '3',
            content: this.content
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
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  .content{
    background: #eef1f6;
    padding: 20px;
  }
  .txt{
    width: 97%;
    height: 200px;
    background: #eef1f6;
    padding: 15px;
  }
  .txt:focus{
    background: #fff;
  }
  .btn{
    margin-top: 20px;
    text-align: center;
  }
  .el-button{
    width: 100px;
  }
</style>
