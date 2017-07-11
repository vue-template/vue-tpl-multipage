import Vue from 'vue'
import App from './App'

// eslint-disable-next-line
new Vue({
  el: '#app',
  // store,
  // router,
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
