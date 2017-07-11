<template>
  <div class="pay-order">
    <Breadcrumb class="w-breadcrumb">
      <Breadcrumb-item><router-link to="order-list">我的订单</router-link></Breadcrumb-item>
      <Breadcrumb-item>订单详情</Breadcrumb-item>
    </Breadcrumb>
    <p class="paytips" v-if="orderInfo.display_status == 2"><Icon type="android-warning"></Icon>请在 30 分钟内完成订单的支付</p>
    <div class="order-info w-cardbox">
      <Card class="w-card" :bordered="false">
        <h3 class="title" slot="title">行程信息</h3>
        <ul class="list">
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
      <Card class="w-card">
        <h3 class="title" slot="title">报价信息</h3>
        <ul class="list">
          <li>报价车企 <em>{{payInfo.company_name}}</em></li>
          <li>总费用 <em>{{payInfo.price | fen2yuan}}</em></li>
          <li>用车费 <em>{{payInfo.car_price | fen2yuan}}</em></li>
          <li v-if="payInfo.road_toll > 0">路桥费 <em>{{payInfo.road_toll | fen2yuan}}</em></li>
          <li v-if="payInfo.room > 0">食宿费 <em>{{payInfo.room | fen2yuan}}</em></li>
          <li v-if="payInfo.park > 0">停车费 <em>{{payInfo.park | fen2yuan}}</em></li>
          <li v-if="payInfo.other > 0">其它费用 <em>{{payInfo.other | fen2yuan}}</em></li>
          <li>支付方式 <em><label>企业支付</label></em></li>
        </ul>
      </Card>
    </div>
    <p class="rules">退单规则：出发前24小时可以全额退款，出行前4小时以上不足24小时退订扣除20%手续费，出行前2小时以上不足4小时退订扣除50%手续费，出行前2小时内不可退订。</p>
    <div class="paynow">
      <div class="protocol"><Checkbox v-model="agree"></Checkbox>我已阅读并同意<a href="xxxx" target="_blank" title="点击查看《嗒嗒巴士包车协议》">《嗒嗒巴士包车协议》</a></div>
      <Button type="primary" size="large" :disabled="!agree" :loading="loading" @click="payOrder">
        <span v-if="loading">提交中...</span>
        <span v-else>立即支付</span>
      </Button>
    </div>
  </div>
</template>

<script>
  // import {mapState, mapGetters, mapActions} from 'vuex'
  import {mapState, mapActions} from 'vuex'
  import ddb from '../assets/js/ddb/'

  export default {
    data() {
      return {
        orderId: this.$route.query.id,
        agree: false,
        loading: false
      }
    },
    computed: {
      ...mapState(['orderInfo', 'payInfo'])
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
      },
      chooseOffer(callback) {
        let data = {
          order_id: this.orderId,
          company_code: this.payInfo.company_code
        }
        this.loading = true
        ddb.get('chartered/choose_company_offer', data).then(res => {
          if (res.ret === 0) {
            callback()
          } else {
            ddb.notify(res.msg)
          }
        })
      },
      submitPay() {
        let self = this
        let data = {
          order_id: this.orderId,
          total_amount: this.payInfo.price
        }
        ddb.post('chartered/pay_order', data).then(res => {
          if (res.ret === 0) {
            ddb.notify('支付成功，3秒后转到订单列表')
            setTimeout(function() {
              // self.$router.go(-1)
              self.$router.replace({
                name: 'order-list'
              })
            }, 3000)
          } else {
            ddb.notify('支付失败：' + res.msg)
          }
        }).catch(err => {
          ddb.notify('支付失败：网络出错[' + err + ']，请检查网络后重试')
        })
      },
      payOrder() {
        this.chooseOffer(this.submitPay)
      }
    }
  }
</script>