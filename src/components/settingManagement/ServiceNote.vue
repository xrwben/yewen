<template>
  <div id="ServiceNote">
    <el-row>
      <el-col :span="24">
        <div class="content">
          <div class="serviceWrapper">
            <div class="serviceType display_box">
              <p>问答服务：</p>
              <textarea class="txt" v-model="questionContent"></textarea>
            </div>
            <p class="btn">
              <el-button type="primary" @click="save(4)">保存</el-button>
            </p>
          </div>
          <div class="serviceWrapper">
            <div class="serviceType display_box">
              <p>约见服务：</p>
              <textarea class="txt" v-model="meetContent"></textarea>
            </div>
            <p class="btn">
              <el-button type="primary" @click="save(5)">保存</el-button>
            </p>
          </div>
          <div class="serviceWrapper">
            <div class="serviceType display_box">
              <p>踩盘服务：</p>
              <textarea class="txt" v-model="treadPlateContent"></textarea>
            </div>
            <p class="btn">
              <el-button type="primary" @click="save(6)">保存</el-button>
            </p>
          </div>
          <div class="serviceWrapper">
            <div class="serviceType display_box">
              <p>方案服务：</p>
              <textarea class="txt" v-model="planContent"></textarea>
            </div>
            <p class="btn">
              <el-button type="primary" @click="save(7)">保存</el-button>
            </p>
          </div>
          <div class="serviceWrapper">
            <div class="serviceType display_box">
              <p>定制服务：</p>
              <textarea class="txt" v-model="customMadeContent"></textarea>
            </div>
            <p class="btn">
              <el-button type="primary" @click="save(8)">保存</el-button>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        questionContent: '',
        meetContent: '',
        treadPlateContent: '',
        planContent: '',
        customMadeContent: '',
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
            configIds: '4,5,6,7,8'
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.questionContent = result.data.page.list[0].content
            this.meetContent = result.data.page.list[1].content
            this.treadPlateContent = result.data.page.list[2].content
            this.planContent = result.data.page.list[3].content
            this.customMadeContent = result.data.page.list[4].content
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
      save (id) {
        switch (id) {
          case 4:
            this.content = this.questionContent
            break
          case 5:
            this.content = this.meetContent
            break
          case 6:
            this.content = this.treadPlateContent
            break
          case 7:
            this.content = this.planContent
            break
          case 8:
            this.content = this.customMadeContent
            break
        }
        this.axios({
          method: 'post',
          url: '/yewen/admin/sysconfig/update',
          data: {
            configId: '' + id,
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
    /*background: #eef1f6;*/
  }
  .serviceWrapper{
    background: #eef1f6;
    padding: 30px 20px 20px 15px;
    margin-bottom: 20px;
  }
  .serviceType{
    width: 100%;
  }
  .serviceType p{
    width: 85px;
  }
  .txt{
    width: 97%;
    height: 100px;
    background: #eef1f6;
    padding: 15px;
    -webkit-box-flex: 1.0;
    box-flex: 1.0;
    display: block;
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
