<template>
  <div class="offers">
    <div class="w-offer" v-for="info of offers" :key="info.order_id">
      <div class="content">
        <div class="intro">
          <div class="title">
            <div class="avatar vip">
              <img :src="info.company_avatar">
            </div>
            <div class="company">
              <h3 class="name">{{info.company_name}}</h3>
              <div v-if="!isCard" class="tags"><span v-for="tag in info.company_label">{{tag}}</span></div>
              <div class="score"><em>车企评分</em><i v-for="n in 5" :class="{'on': n <= info.score}"></i></div>
            </div>
          </div>
          <!-- <div v-if="!isCard" class="score"><em>车企评分</em><i v-for="n in 5" :class="{'on': n <= info.score}"></i></div> -->
        </div>
        <dl class="details">
          <dt>
            <span class="key">车辆费用</span>
            <span class="val">{{info.scheduling_list | carPriceCount | fen2yuan}}元<i v-if="!isCard" :class={on:openCarInfo} @click="toggleInfo('car')"></i></span>
          </dt>
          <dd v-show="openCarInfo">
            <table>
              <tr class="head">
                <td>车牌号</td>
                <td>座位数</td>
                <td>单价</td>
                <td>合计</td>
              </tr>
              <tr class="content" v-for="item in info.scheduling_list">
                <td>{{item.car_no}}</td>
                <td>{{item.car_seat}}</td>
                <td>{{item.price | fen2yuan}}元</td>
                <td>{{item.price | fen2yuan}}元</td>
              </tr>
            </table>
          </dd>
          <dt>
            <span class="key">行程费用</span>
            <span class="val">{{info | tripPriceCount | fen2yuan}}元<i v-if="!isCard" :class={on:openTripInfo} @click="toggleInfo('trip')"></i></span>
          </dt>
          <dd v-show="openTripInfo">
            <table>
              <tr class="head">
                <td>路桥费</td>
                <td>食宿费</td>
                <td>停车费</td>
                <td>其它</td>
                <td>合计</td>
              </tr>
              <tr class="content">
                <td>{{info.road_toll | fen2yuan}}元</td>
                <td>{{info.room | fen2yuan}}元</td>
                <td>{{info.park | fen2yuan}}元</td>
                <td>{{info.other | fen2yuan}}元</td>
                <td>{{info | tripPriceCount | fen2yuan}}元</td>
              </tr>
              <tr class="content">
                <td colspan="5" class="empty">其它费用说明，请根据实际情况线下结算</td>
              </tr>
            </table>
          </dd>
          <dt>
            <span class="key total">总报价</span>
            <span class="val total">{{info.price | fen2yuan}}元</span>
          </dt>
        </dl>
      </div>
      <div class="footer"><Button type="primary" size="large" @click="gopay(info)">去支付</Button></div>
    </div>
  </div>
</template>

<script>
  // import {mapState, mapActions} from 'vuex'
  import {mapActions} from 'vuex'
  // import ddb from '../assets/js/ddb/'

  export default {
    props: {
      orderId: {
        type: String,
        required: true
      },
      limit: [String, Number],
      type: {
        type: String,
        default: 'list'
      }
    },
    data() {
      return {
        isCard: this.type === 'card',
        openCarInfo: false,
        openTripInfo: false,
        offerList: []
      }
    },
    filters: {
      carPriceCount(list) {
        let total = 0
        // let prices = list.filter(item => item.price)
        list.forEach(item => {
          total += Number(item.price)
        })
        return total
      },
      tripPriceCount(info) {
        return Number(info.road_toll) + Number(info.room) + Number(info.park) + Number(info.other)
      }
    },
    computed: {
      // ...mapState(['offerList']),
      offers() {
        if (this.limit) {
          return this.offerList.slice(0, this.limit)
        }
        return this.offerList
      }
    },
    created() {
      this.init()
      // let self = this
      // ddb.offerTimer = setInterval(function() {
      //   self.init()
      // }, 10000)
    },
    methods: {
      ...mapActions(['getOfferList', 'setPayInfo']),
      init() {
        this.getOfferList({
          data: {order_id: this.orderId}
        }).then(res => {
          if (res.ret === 0 && res.data) {
            this.offerList = res.data.offer_list
          }
        })
      },
      toggleInfo(type) {
        if (type === 'car') {
          this.openCarInfo = !this.openCarInfo
        } else {
          this.openTripInfo = !this.openTripInfo
        }
      },
      gopay(info) {
        this.setPayInfo({data: info})
        this.$router.push({
          name: 'pay-order',
          query: {id: info.order_id}
        })
      }
    }
  }
</script>