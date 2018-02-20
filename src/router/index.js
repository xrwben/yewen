import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['@/pages/Login.vue'], resolve)
const Home = resolve => require(['@/pages/Home.vue'], resolve)
const OrderManagement = resolve => require(['@/pages/OrderManagement.vue'], resolve)
const CheckManagement = resolve => require(['@/pages/CheckManagement.vue'], resolve)
const DrawCashManagement = resolve => require(['@/pages/DrawCashManagement.vue'], resolve)
const MessagePush = resolve => require(['@/pages/MessagePush.vue'], resolve)
const ActivePush = resolve => require(['@/pages/ActivePush.vue'], resolve)
const UserManagement = resolve => require(['@/pages/UserManagement.vue'], resolve)
const CouponManagement = resolve => require(['@/pages/CouponManagement.vue'], resolve)
const IncomeDistributeManagement = resolve => require(['@/pages/IncomeDistributeManagement.vue'], resolve)
const ServicePriceManagement = resolve => require(['@/pages/ServicePriceManagement.vue'], resolve)
const BuildingDatabase = resolve => require(['@/pages/BuildingDatabase.vue'], resolve)
const FinancialData = resolve => require(['@/pages/FinancialData.vue'], resolve)
const InformationCollect = resolve => require(['@/pages/InformationCollect.vue'], resolve)
const AccountManagement = resolve => require(['@/pages/AccountManagement.vue'], resolve)
const SettingManagement = resolve => require(['@/pages/SettingManagement.vue'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    // {
    //   path: '',
    //   redirect: '/login'
    // },
    {
      name: 'Home',
      path: '/',
      component: Home,
      redirect: '/login',
      children: [
        {
          name: '订单管理',
          path: '/ordermanagement',
          component: OrderManagement,
          role: '0'
        },
        {
          name: '审核管理',
          path: '/checkmanagement',
          component: CheckManagement,
          role: '0,1'
        },
        {
          name: '提现管理',
          path: '/drawcashmanagement',
          component: DrawCashManagement,
          role: '0,1'
        },
        {
          name: '消息推送',
          path: '/messagepush',
          component: MessagePush,
          role: '0,1'
        },
        {
          name: '活动推送',
          path: '/activepush',
          component: ActivePush,
          role: '0,1'
        },
        {
          name: '用户管理',
          path: '/usermanagement',
          component: UserManagement,
          role: '0,1'
        },
        {
          name: '优惠券管理',
          path: '/couponmanagement',
          component: CouponManagement,
          role: '0,1'
        },
        {
          name: '分成收入管理',
          path: '/incomedistributemanagement',
          component: IncomeDistributeManagement,
          role: '0,1'
        },
        {
          name: '服务价格管理',
          path: '/servicepricemanagement',
          component: ServicePriceManagement,
          role: '0,1'
        },
        {
          name: '楼盘数据库',
          path: '/buildingdatabase',
          component: BuildingDatabase,
          role: '0,1'
        },
        {
          name: '财务数据',
          path: '/financialdata',
          component: FinancialData,
          role: '0'
        },
        {
          name: '信息收集',
          path: '/informationcollect',
          component: InformationCollect,
          role: '0,1'
        },
        {
          name: '账号管理',
          path: '/accountmanagement',
          component: AccountManagement,
          role: '0'
        },
        {
          name: '设置',
          path: '/settingmanagement',
          component: SettingManagement,
          role: '0,1'
        }
      ]
    }
  ]
})
