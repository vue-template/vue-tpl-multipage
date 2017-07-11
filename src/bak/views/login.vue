<template>
  <div class="login">
    <div class="logo"></div>
    <div class="reg"><a :href="regUrl">注册</a></div>

    <div class="login-wrap">
      <div class="login-box">
        <ul>
          <li class="mobile"><input type="tel" v-model="mobile" maxlength="11" autofocus @keydown.enter="getAuthCode" placeholder="请输入手机号码"></li>
          <li class="err" v-show="err">您的账号尚未开通权限</li>
          <li class="code">
            <input type="tel" v-model="authCode" @keydown.enter="login" placeholder="请输入验证码">
            <button @click="getAuthCode" :class="{disabled:disCodeButton}">{{ authText }}</button>
          </li>
          <li class="btn"><button @click="login" :class="{disabled:disLoginButton}">登录</button></li>
          <li class="info">想了解更多请拨打客服热线 0755-36901727</li>
        </ul>
      </div>
    </div>

    <div class="tabs">
      <div class="cover"></div>
      <div class="tab">
        <img src="../assets/img/login_icon1.png" height="78" width="90">
        <p>专为企业用户设计</p>
      </div>
      <div class="tab midd">
        <img src="../assets/img/login_icon2.png" height="78" width="90">
        <p>多个订单同时下达</p>
      </div>
      <div class="tab">
        <img src="../assets/img/login_icon3.png" height="78" width="90">
        <p>报价信息更详细</p>
      </div>
    </div>

    <vfooter></vfooter>
  </div>
</template>

<script>
  import vfooter from '../components/footer.vue'
  import ddb from '../assets/js/ddb/'

  export default {
    name: 'home',
    components: {
      vfooter
    },
    data() {
      return {
        authText: '获取验证码',
        mobile: '',
        authCode: '',
        err: false,
        time: true,
        regUrl: ddb.config.regUrl + '?referrer=' + encodeURIComponent(location.href)
      }
    },
    watch: {
      mobile() {
        this.err = false
      }
    },
    computed: {
      disCodeButton() {
        var reg = /^1\d{10}$/
        return !(reg.test(this.mobile) && this.time)
      },
      disLoginButton() {
        var reg = /^1\d{10}$/
        return !(reg.test(this.mobile) && this.authCode)
      }
    },
    methods: {
      getAuthCode() {
        var self = this
        if (this.disCodeButton || !this.time) {
          return
        }

        self.time = false
        var t = 60
        self.authText = t + 's后重新获取'
        var timer = setInterval(function() {
          t--
          self.authText = t + 's后重新获取'
          if (t === 0) {
            clearInterval(timer)
            self.time = true
            self.authText = '获取验证码'
          }
        }, 1000)

        ddb.get('authentication/send_auth_msg', {
          mobile: this.mobile
        }).then(res => {
          if (res.ret !== 0) {
            alert(res.msg)
          } else {
            alert('验证码已发送至 ' + self.mobile)
          }
        })
      },
      login() {
        if (this.disLoginButton) return
        var self = this
        ddb.get('authentication/auth_verify', {
          mobile: this.mobile,
          auth_code: this.authCode
        }).then(res => {
          if (+res.ret === 0) {
            ddb.cookie('mobile', res.data.mobile, {expires: 1, path: '/'})
            ddb.cookie('user_id', res.data.user_id, {expires: 1, path: '/'})
            ddb.cookie('ddb_token', res.data.token, {expires: 1, path: '/'})
            ddb.cookie('company_name', res.data.company_name, {expires: 1, path: '/'})
            ddb.cookie('user_name', res.data.user_name, {expires: 1, path: '/'})

            // 登录后根据来源路径跳转
            let referrer = ddb.getParam('referrer')
            if (referrer) {
              if (/^http[s]?:/i.test(referrer)) {
                location.replace(referrer)
              } else {
                self.$router.replace(referrer)
              }
            } else {
              // self.$router.replace('chartered')
              history.go(-1)
            }
          } else if (+res.ret === 7001) {
            self.err = true
          } else {
            alert(res.msg)
          }
        })
      }
    }
  }
</script>
