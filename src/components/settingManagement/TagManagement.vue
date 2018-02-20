<template>
  <div id="TagManagement">
    <el-row>
      <el-col :span="12">
        <div class="tag">
          <el-tag
            class="tagName"
            :key="tag.labelId"
            v-for="(tag,index) in dynamicTags"
            :closable="true"
            :close-transition="false"
            @close="delTag(tag.labelId)"
            type="primary">
            {{ tag.label }}
          </el-tag>
          <el-input
            class="inputNewTag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="addTag"
            @blur="addTag">
          </el-input>
          <el-button v-else class="buttonNewTag" @click="showInput">+</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dynamicTags: ['標簽', '標簽'],
        inputVisible: false,
        inputValue: ''
      }
    },
    mounted () {
      this.getDatas()
    },
    methods: {
      // 删掉标签
      delTag (tagId) {
        this.axios({
          method: 'post',
          url: '/yewen/admin/label/delete',
          params: {
            labelIds: tagId
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.$message({
              message: result.data.msg,
              type: 'success'
            })
            this.getDatas()
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      // 显示新增表便签输入框
      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      // 新增标签
      addTag () {
        let inputValue = this.inputValue.trim()
        if (inputValue) {
          console.log(inputValue)
          this.axios({
            method: 'post',
            url: '/yewen/admin/label/save',
            params: {
              label: inputValue
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
        this.inputVisible = false
        this.inputValue = ''
      },
      // 获取全部标签数据
      getDatas () {
        this.axios({
          method: 'get',
          url: '/yewen/admin/label/list',
          params: {
            pageNum: '',
            pageSize: ''
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.dynamicTags = result.data.page.list
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
  .tag{
    background: #eef1f6;
    padding: 20px;
    .tagName{
      margin-right: 20px;
      margin-bottom: 20px;
    }
    .inputNewTag{
      width: 70px;
      height: 24px;
      display: inline-block;
    }
    .buttonNewTag{
      height: 24px;
      line-height: 22px;
      font-size: 12px;
      padding: 0px 30px;
    }
  }
</style>
