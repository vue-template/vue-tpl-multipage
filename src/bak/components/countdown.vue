<template>
  <time v-if="countTime" class="w-countdown">{{countTime}}</time>
</template>

<script>
  import {mapActions} from 'vuex'
  import ddb from '../assets/js/ddb/'

  export default {
    props: {
      startTime: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        countTime: 0
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
      ...mapActions(['getOfferList']),
      init() {
        // this.getOfferList({
        //   data: {order_id: this.orderId}
        // })
        this.upCountTime()
      },

      // 更新倒计时时间
      upCountTime() {
        let self = this
        let leftTime = 30 * 60000 // 剩余抢单时间

        // 更新剩余抢单时间
        let now = new Date().getTime()
        let start = new Date(this.startTime.replace(/-/g, '/')).getTime()
        leftTime = leftTime - (now - start)

        if (leftTime > 0) {
          self.countTime = ddb.util.pad(Math.floor(leftTime / 60000)) + ':' + ddb.util.pad(Math.floor(leftTime % 60000 / 1000))
          clearInterval(ddb.countTimer)
          ddb.countTimer = setInterval(function() {
            let times = self.countTime.split(':')
            let m = Number(times[0]) // 分
            let s = Number(times[1]) // 秒

            if (m === 0 && s === 0) {
              // if (!self.offerCount) self.$router.replace('order-list')
            } else if (m >= 0) {
              if (s > 0) {
                s--
              } else if (s === 0) {
                m--
                s = 59
              }
              self.countTime = ddb.util.pad(m) + ':' + ddb.util.pad(s)
            }
          }, 1000)
        }
      }
    }
  }
</script>