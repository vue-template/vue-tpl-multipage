<template>
  <div class="home">
    <vheader></vheader>
    <div class="main">
      <div class="layout">
        <Tabs class="w-tab" :value="tabValue" @on-click="toggleTab">
          <Tab-pane label="我要约车" :name="tab1Name"></Tab-pane>
          <Tab-pane label="我的订单" :name="tab2Name"></Tab-pane>
          <p slot="extra">客服热线：<em>0755-36901727</em></p>
        </Tabs>
        <keep-alive>
          <router-view class="subview"></router-view>
        </keep-alive>
      </div>
    </div>
    <vfooter></vfooter>
  </div>
</template>

<script>
  // import {mapState, mapGetters, mapActions} from 'vuex'
  import vheader from '../components/header.vue'
  import vfooter from '../components/footer.vue'

  export default {
    name: 'chartered',
    components: {
      vheader,
      vfooter
    },
    data() {
      let routeName = this.$route.name
      let tab1Name = 'order-place'
      return {
        tab1Name,
        tabValue: routeName,
        tab2Name: routeName !== tab1Name ? routeName : 'order-list'
      }
    },
    watch: {
      $route(to, from) {
        this.tabValue = to.name
        this.tab2Name = to.name !== this.tab1Name ? to.name : this.tab2Name
      }
    },
    computed: {
      // ...mapState(['failImg', 'plate', 'borrowCount']),
      // ...mapGetters(['validGoods'])
      // tabValue() {
      //   return this.$route.name
      // },
      // tab2Name() {
      //   let routeName = this.$route.name
      //   console.log('test')
      //   return routeName !== 'order-place' ? routeName : this.lastTab2Name
      // }
    },
    created() {
      // let ddb = window.ddb
      // console.log(ddb)
      // ddb.user.syncLogin()
      // console.log(this.$ddb)
      // this.$dialog.confirm({
      // ddb.confirm({
      //   title: '选填标题',
      //   mes: '我有一个小毛驴我从来也不骑！',
      //   opts: () => {
      //     this.$dialog.toast({
      //       mes: '你点了确定',
      //       timeout: 1000
      //     })
      //   }
      // })
      // ddb.loading()
      // this.$http.get(ddb.config.api + 'borrow_goods/get_goods_list', {params: ddb.params})

      // this.init()
    },
    methods: {
      // ...mapActions(['getGoods', 'getBorrowCount']),
      // init() {
      //   this.getGoods({
      //     api: 'borrow_goods/get_goods_list',
      //     data: {plate: this.plate}
      //   })

      //   this.getBorrowCount({
      //     api: 'borrow_member/my_borrow_count'
      //   })
      // },
      // imgFailed(e) {
      //   e.target.src = this.failImg
      // },
      // viewGoods(id) {
      //   this.$router.push({
      //     name: 'confirm-borrow',
      //     query: {id}
      //   })
      // }
      toggleTab(name) {
        // console.log(this.$route.path.slice(this.$route.path.lastIndexOf('/') + 1))
        // console.log(this.$route.name)
        // switch (name) {
        //   case 'tab1':
        //     this.$router.push({
        //       name: 'order-place'
        //       // params: {userId: 123}
        //     })
        //     break
        //   case 'tab2':
        //     this.$router.push({
        //       name: 'order-details'
        //     })
        //     break
        // }
        this.$router.push({name})
      }
    }
  }
</script>
