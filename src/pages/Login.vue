<template>
 <div id="LoginBackground">
   <el-form id="Login" :model="ruleForm" :rules="rules" ref="ruleForm">
      <h3>系统登录</h3>
     <el-form-item prop="userName">
       <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
     </el-form-item>
     <el-form-item prop="passWord">
       <el-input type="password" v-model="ruleForm.passWord" placeholder="请输入密码"></el-input>
     </el-form-item>
     <el-form-item>
       <el-button class="submit" type="primary" @click.prevent="submitForm('ruleForm')":loading="showLoading">登录</el-button>
     </el-form-item>
   </el-form>
 </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      let checkUserName = (rule, value, callback) => {
        if (!value.trim()) {
          return callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      let checkPassword = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        showLoading: false,
        ruleForm: {
          userName: '',
          passWord: ''
        },
        rules: {
          userName: [
            {validator: checkUserName, trigger: 'blur'}
          ],
          passWord: [
            {validator: checkPassword, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.showLoading = true
            // 请求接口判断登录信息
            this.axios({
              method: 'post',
              url: '/yewen/admin/ywuser/login',
              params: {
                account: this.ruleForm.userName,
                password: this.ruleForm.passWord
              }
            }).then((result) => {
              if (result.data.code === 0) {
                sessionStorage.setItem('role', result.data.role)
                sessionStorage.setItem('roleName', result.data.roleName)
                if (result.data.role === 0) {
                  this.$router.push({path: '/ordermanagement'})
                } else {
                  this.$router.push({path: '/checkmanagement'})
                }
              } else {
                this.showLoading = false
                this.$message({
                  message: result.data.msg,
                  type: 'error'
                })
              }
            }).catch((error) => {
              console.log(error)
              this.showLoading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" type="text/css" scoped>
  #LoginBackground{
    width: 100%;
    height: 100vh;
    position: relative;
    background: url("../assets/loginBg.jpg") no-repeat center;
    background-size: cover;
  }
   #Login{
     width: 350px;
     padding: 35px 35px 15px 35px;
     margin: 180px auto 0;
     border: 1px solid #eaeaea;
     border-radius: 5px;
     box-shadow: 0 0 25px #cac6c6;
     background: #fff;
     position: absolute;
     left: 0;
     right: 0;
   }
   #Login h3{
     margin: 0 auto 40px;
     text-align: center;
     color: #505458;
   }
  .submit{
    width: 100%;
  }
</style>
