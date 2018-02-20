<template>
  <div id="systemMessage">
    <div v-if="!showPopup">
      <!-- toolbar -->
      <el-row>
        <el-form>
          <el-col :span="8">
            <el-form-item label="发布时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="date1" @change="optionChange"></el-date-picker>
              —
              <el-date-picker type="date" placeholder="选择日期" v-model="date2" @change="optionChange"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-button type="primary" @click="showPublish()">发布</el-button>
          </el-col>
        </el-form>
      </el-row>

      <!-- table -->
      <el-table :data="activeMessageDatas" resizable border>
        <el-table-column label="发布时间" align="center" width="120">
          <template scope="scope">
            <span>{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题内容">
          <template scope="scope">
            <span class="isLink" @click="showPublish(scope.row.activityId)">{{ scope.row.title }}</span>
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

    <!-- 活动推送发布弹窗 -->
    <el-row class="popup" v-if="showPopup">
      <el-col :span="16">
        <p class="close"><i class="iconfont icon-guanbi" @click="close()"></i></p>
      </el-col>
      <el-col :span="16" style="padding: 10px;">
        <div class="title display_box">
          <label>消息标题：</label>
          <input type="text" v-model="title" />
        </div>
        <!--<div class="thumbnail display_box">-->
          <!--<label>缩略图：</label>-->
          <!--<div class="pic">-->
            <!--<el-upload-->
              <!--class="avatarUploader"-->
              <!--action="/yewen/oss/upload?fileType=1"-->
              <!--accept="image/gif,image/jpeg,image/jpg,image/png"-->
              <!--:show-file-list="false"-->
              <!--:on-success="handleAvatarSuccess"-->
              <!--:before-upload="beforeAvatarUpload">-->
              <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
              <!--<i v-else class="el-icon-plus avatarUploaderIcon"></i>-->
            <!--</el-upload>-->
          <!--</div>-->
        <!--</div>-->
        <div class="content display_box imageStyle">
          <label>消息标题：</label>
          <vue-html5-editor :content="content" @change="updateData" :height="500"></vue-html5-editor>
        </div>
        <!--<p>* 系统消息请不要上传图片！</p>-->
        <div class="btn" v-show="showBtn">
          <el-button type="primary" @click="publish">确定</el-button>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import dateFormat from '../../utils/dateFormat.js'
  export default {
    data () {
      return {
        date1: '',
        date2: '',
        currentPage: 1,
        pageSize: 10,
        totalSize: 0,
        activeMessageDatas: [],
        showPopup: false,
        title: '',
        imageUrl: '',
        content: '',
        showBtn: true
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      // 获取活动列表数据
      getDatas () {
        this.axios({
          method: 'get',
          url: 'yewen/admin/sysMsg',
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            startDate: this.date1,
            endDate: this.date2
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.activeMessageDatas = result.data.data.list
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
      // 显示活动详情
      showPublish (id) {
        this.showPopup = true
        if (id) {
          this.showBtn = false
          this.axios({
            method: 'get',
            url: '/yewen/admin/publish/detial',
            params: {
              activityId: id
            }
          }).then((result) => {
            if (result.data.code === 0) {
              this.title = result.data.data.title
              this.imageUrl = result.data.data.imgurl
              this.content = result.data.data.content
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
          this.title = ''
          this.imageUrl = ''
          this.content = ''
          this.showBtn = true
        }
      },
      // 确认发布
      publish () {
//        console.log(this.content)
        if (this.title !== '' && this.content !== '') {
          this.axios({
            method: 'post',
            url: '/yewen/admin/publish',
            data: {
              type: 2,
              title: this.title,
              imgurl: this.imageUrl,
              content: this.content
            }
          }).then((result) => {
            if (result.data.code === 0) {
              this.$message({
                message: result.data.msg,
                type: 'success'
              })
              this.showPopup = false
              this.getDatas()
            } else if (result.data.code === 400) {
              this.$message({
                message: result.data.msg,
                type: 'error'
              })
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
            message: '发布消息不能存在空内容！',
            type: 'warning'
          })
        }
      },
      // 关闭按钮
      close () {
        this.showPopup = false
      },
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
      // 富文本内容
      updateData (value) {
        this.content = value
      }
    },
    filters: {
      dateFormat
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  .el-input{
    max-width: 120px
  }
  .pagination{
    margin-top: 15px;
    /*text-align: center;*/
  }

  .isLink{
    cursor: pointer;
    &:hover{
      color: #20a0ff;
    }
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
  .title{
    width: 100%;
    height: 40px;
    line-height: 35px;
    align-items: center;
    display: flex;
    label{
      width: 120px;
      display: block;
    }
    input{
      width: 100%;
      height: 30px;
      padding: 3px 10px;
      border: 1px solid #ccc;
      display: block;
    }
  }
  /*.thumbnail{*/
    /*margin-top: 35px;*/
    /*display: flex;*/
    /*label{*/
      /*width: 120px;*/
      /*display: block;*/
    /*}*/
    /*.pic{*/
      /*width: 100%;*/
      /*-webkit-box-flex: 1.0;*/
      /*-moz-box-flex: 1.0;*/
      /*.avatarUploader{*/
        /*max-width: 300px;*/
        /*height: 178px;*/
        /*display: block;*/
      /*}*/
    /*}*/
  /*}*/
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

  .content{
    margin-top: 35px;
    display: flex;
    label{
      width: 120px;
      display: block;
    }
    .vue-html5-editor{
      width: 100%;
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
