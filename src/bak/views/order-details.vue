<template>
  <div class="order-details">
    <Breadcrumb class="w-breadcrumb">
      <Breadcrumb-item><router-link to="order-list">我的订单</router-link></Breadcrumb-item>
      <Breadcrumb-item>订单详情</Breadcrumb-item>
    </Breadcrumb>
    <div class="order-info w-cardbox">
      <Card class="w-card" :bordered="false">
        <h3 class="title" slot="title">行程信息</h3>
        <ul class="list">
          <li v-if="orderInfo.refund_status == 2">退款金额 <em>{{orderInfo.refund_total_amount | fen2yuan}}元</em></li>
          <li>包车类型 <em>{{orderInfo.trip_type | tripType}}</em></li>
          <li>出发地 <em>{{orderInfo.start_city_name}}{{orderInfo.start_place_detail}}</em></li>
          <li>目的地 <em>{{orderInfo.end_city_name}}{{orderInfo.end_place_detail}}</em></li>
          <li>发车时间 <em>{{orderInfo.start_time}}</em></li>
          <li v-if="orderInfo.trip_type > 1">结束时间 <em>{{orderInfo.end_time}}</em></li>
          <li>乘车人数 <em>{{orderInfo.passenger_count}}</em></li>
          <li>联系人 <em>{{orderInfo.contact_name}}</em></li>
          <li>联系电话 <em>{{orderInfo.contact_mobile}}</em></li>
          <li v-if="orderInfo.user_comments">备注 <em>{{orderInfo.user_comments}}</em></li>
        </ul>
      </Card>
      <Card v-if="offerInfo.price" class="w-card">
        <h3 class="title" slot="title">报价信息</h3>
        <ul class="list">
          <li>报价车企 <em>{{offerInfo.company_name}}</em></li>
          <li>总费用 <em>{{offerInfo.price | fen2yuan}}元</em></li>
          <li>用车费 <em>{{offerInfo.car_price | fen2yuan}}元</em></li>
          <li v-if="offerInfo.road_toll > 0">路桥费 <em>{{offerInfo.road_toll | fen2yuan}}元</em></li>
          <li v-if="offerInfo.room > 0">食宿费 <em>{{offerInfo.room | fen2yuan}}元</em></li>
          <li v-if="offerInfo.park > 0">停车费 <em>{{offerInfo.park | fen2yuan}}元</em></li>
          <li v-if="offerInfo.other > 0">其它费用 <em>{{offerInfo.other | fen2yuan}}元</em></li>
        </ul>
      </Card>
      <Card v-if="schedulingList.length" class="w-card">
        <h3 class="title" slot="title">排班信息</h3>
        <ul v-for="(item, i) in schedulingList" class="list">
          <li>车牌号{{item | role(i)}} <em>{{item.car_no}}</em></li>
          <li>车型 <em>商务{{item.car_seat}}</em></li>
          <li>司机 <em>{{item.driver_name}}</em></li>
          <li>联系电话 <em>{{item.mobile}}</em></li>
        </ul>
      </Card>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  // import ddb from '../assets/js/ddb/'

  export default {
    data() {
      return {
        orderId: this.$route.query.id
      }
    },
    computed: {
      ...mapState(['orderInfo']),
      ...mapGetters(['offerInfo', 'schedulingList'])
    },
    filters: {
      role(item, i) {
        if (+item.role === 2) {
          return '（队长车）'
        } else {
          return i + 1
        }
      }
    },
    activated() {
      this.init()
    },
    methods: {
      ...mapActions(['getOrderInfo']),
      init() {
        this.getOrderInfo({
          data: {order_id: this.orderId}
        })
      }
    }
  }
</script>