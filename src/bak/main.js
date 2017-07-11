import Vue from 'vue'
import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import './assets/css/iview.less'
import router from './router/'
import store from './store/'
import filters from './filters'
// import 'nib/index.styl'
import './assets/css/main.styl' // !如果在组件后导入会导致组件中样式在前?
import './assets/css/order-place.styl'
import './assets/css/login.styl'
import './assets/css/ie.styl'
import ddb from './assets/js/ddb/'
import App from './app'

Vue.use(iView)

window.ddb = ddb
Vue.prototype.$ddb = ddb
Vue.config.productionTip = false // 关闭生产模式下的提示

// 定义 vue 过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// 转页前处理：更新标题/登录中间验证
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || document.title
  // window.scrollTo(0, 0) // 转页后滚动页面

  // 登录中间验证
  if (to.meta.needlogin && !ddb.user.isLogin()) {
    next({
      path: '/login',
      query: {
        referrer: to.fullPath
      }
    })
  } else {
    next()
  }
})

// 给 IE 浏览器添加标识
if (ddb.env.isIE) {
  // document.documentElement.classList.add('ie')
  document.documentElement.className += (document.documentElement.className ? ' ie' : 'ie')
  document.documentElement.className += (ddb.env.isIE9 ? ' ie9' : '')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
  // data: {
  //   // transitionName: 'slide-left'
  // },
  // created() {
  //   this.init()
  // },
  // watch: {
  //   '$route': function(to, from) {
  //     var toDepth = to.path.split('/').length;
  //     var fromDepth = from.path.split('/').length;
  //     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  //   }
  // },
  // methods: {
  //   init() {
  //     let plate = ddb.getParam('plate') || ddb.session('plate') || '粤BC5033'
  //     if (!plate) ddb.tips('缺少必要参数：[车牌号]')
  //     ddb.session('plate', plate)
  //     this.$store.commit('setPlate', plate)
  //   }
  // }
})
