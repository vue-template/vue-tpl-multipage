<template>
  <div class="offer-list">
    <Breadcrumb class="w-breadcrumb">
      <Breadcrumb-item><router-link to="order-list">我的订单</router-link></Breadcrumb-item>
      <Breadcrumb-item>报价信息</Breadcrumb-item>
    </Breadcrumb>

    <div class="tips">
      <p>您的行程已经发送给所有车企，车企将为您限时抢单报价（30分钟后抢单将会停止）</p>
      <!-- <div class="timer"><countdown :start-time="curOrder.create_time"></countdown> <Button type="primary" size="small">刷新</Button></div> -->
    </div>

    <offers :order-id="orderId"></offers>
  </div>
</template>

<script>
  // import {mapState, mapActions} from 'vuex'
  import {mapState} from 'vuex'
  import offers from '../components/offers.vue'
  import countdown from '../components/countdown.vue'

  export default {
    components: {
      offers,
      countdown
    },
    data() {
      return {
        orderId: this.$route.query.id
      }
    },
    computed: {
      ...mapState(['orderList']),
      curOrder() {
        return this.orderList.filter(order => order.order_id === this.orderId) || {}
      }
    },
    activated() {
      // this.init()
      // console.log(this.curOrder)
    }
    // methods: {
    //   ...mapActions(['getOrderInfo']),
    //   init() {
    //     this.getOrderInfo({
    //       data: {order_id: this.orderId}
    //     })
    //   }
    // }
  }
</script>