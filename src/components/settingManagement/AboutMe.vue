<template>
  <div id="AboutMe">
    <el-row>
      <el-col :span="24">
        <div class="content">
          <el-upload
            class="avatarUploader"
            action="/yewen/oss/upload?fileType=1"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatarUploaderIcon"></i>
          </el-upload>

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
        imageUrl: '',
        content: '关于我们！！'
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      // 上传成功的回显方法
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.imageUrl = res.file
      },
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 3
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 3MB!')
        }
        return isLt2M
      },
      // 获取数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/sysconfig/list',
          params: {
            configIds: 1
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.imageUrl = result.data.page.list[0].image
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
            configId: '1',
            content: this.content,
            image: this.imageUrl
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
  .avatarUploader{
    width: 50%;
    max-width: 300px;
  }
  .avatarUploaderIcon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 178px;
    display: block;
  }
  .txt{
    width: 60%;
    height: 200px;
    background: #eef1f6;
    margin-top: 30px;
    padding: 15px;
  }
  .txt:focus{
    background: #fff;
  }
  .btn{
    margin-top: 20px;
    text-align: center;
    transform: translateX(-20%);
  }
  .el-button{
    width: 100px;
  }
</style>
