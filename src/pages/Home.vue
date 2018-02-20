<template>
  <div id="Home">
    <el-row class="wrapper">
      <!-- header -->
      <el-col :span="24" class="header">
        <el-col :span="16">
          <div class="logo">
            <img src="../assets/logo.png">
          </div>
        </el-col>
        <el-col :span="8" class="userInfo">
          <div class="info">
            <img src="http://up.qqjia.com/z/face01/face06/facejunyong/junyong04.jpg">
            <span>{{ roleName }}</span>
            <i class="iconfont icon-tuichu" @click="logOut()"></i>
          </div>
        </el-col>
      </el-col>
      <!-- body -->
      <el-col :span="24" class="bodyCon">
        <div class="siderMenu">
          <el-menu :default-active="$route.path" router>
            <div v-for="(item, index) in routerData">
              <el-menu-item :index="item.path" v-if="item.role.indexOf(role) > -1">{{ item.name }}</el-menu-item>
              <!--<el-menu-item :index="item.path" v-if="item.role">{{ item.role }}{{ item.name }}</el-menu-item>-->
            </div>
          </el-menu>
        </div>
        <div class="main">
          <el-row>
            <el-row :span="24" class="container">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-row>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routerData: [],
      role: sessionStorage.getItem('role'),
      roleName: sessionStorage.getItem('roleName')
    }
  },
  mounted () {
    this.routerData = this.$router.options.routes[1].children
  },
  methods: {
    logOut () {
      this.$confirm('确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: 'post',
          url: '/yewen/admin/ywuser/quit'
        }).then(result => {
          if (result.data.code === 0) {
            this.$router.push('/login')
            sessionStorage.removeItem('role')
            sessionStorage.removeItem('roleName')
            this.$message({
              type: 'success',
              message: '退出成功!'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出！'
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  #Home{
    .wrapper{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      .header{
        height: 80px;
        line-height: 80px;
        background: #73b4e4;
        padding: 0 30px;
        .logo{
          height: 80px;
          display:flex;
          align-items:center;
          img{
            width: 120px;
            height: 40px;
          }
        }
        .info{
          height: 80px;
          display:flex;
          align-items:center;
          justify-content: flex-end;
          img{
            width: 40px;
            height: 40px;
            border: 1px solid #e6e6e6;
            border-radius: 50%;
          }
          span{
            padding: 0 30px 0 10px;
          }
          i{
            cursor: pointer;
          }
        }
      }
      .bodyCon{
        position: absolute;
        top: 80px;
        bottom: 0px;
        overflow: hidden;
        display: flex;
        .siderMenu{
          width: 150px;
          text-align: center;
          .el-menu{
            height: 100%;
            padding-top: 20px;
            div{
              /*height: 5%;*/
              .el-menu-item{
                height: 35px;
                line-height: 35px;
              }
            }
          }
        }
        .main{
          flex: 1.0;
          padding: 20px;
          overflow-y: auto;
        }
      }
    }
  }
</style>
