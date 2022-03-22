<template>
  <div class="login-container">
    <van-nav-bar class="login-in-btn" title="登录">
      <van-icon slot="left" name="cross" @click="goBack" size="0.5rem"/>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        v-model="user.mobile"
        name="user"
        placeholder="请输入手机号"
        :rules="userFormRules.userMobile"
        type="number"
        maxlength="11"
      >
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <i slot="right-icon" class="separate">|</i>
      <template #button>
        <van-button class="send-auth-code" round size="small" type="default" native-type="button" v-if="isCountDownShow">
          <van-count-down :time="1000*60" format="剩 ss 秒可重发" @finish="isCountDownShow = false" />
        </van-button>
        <van-button class="send-auth-code" round size="small" type="default" @click="onSendSms" native-type="button" v-else>获取验证码</van-button>
      </template>
      </van-field>
      <div class="login-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        userMobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'onBlur'
          },
          {
            pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
            message: '手机号格式错误',
            trigger: 'onBlur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'onBlur'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码错误',
            trigger: 'onBlur'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  watch: {

  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        this.$toast.success('登录成功!')
        this.$store.commit('setUser', data.data)
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.success('登录的手机号或验证码错误!')
        } else {
          this.$toast.success('登录失败,请稍后再试!')
        }
      }
    },
    async onSendSms() {
      try {
        await this.$refs.loginFormRef.validate('user')
      } catch (err) {
        return
        // return console.log('手机验证失败', err)
      }
      this.isCountDownShow = true
      try {
        await sendSms(this.user.mobile)
        this.$toast('获取验证码成功!')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('获取验证码操作太频繁了,请稍后再试!')
        } else {
          this.$toast('获取验证码失败,请稍后再试!')
        }
      }
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  .toutiao {
    width: 24px;
    height: 37px;
    font-size: 37px;
    color: #666;
  }
  .van-field {
    ::placeholder {
      font-size: 26px;
    }
    .send-auth-code {
      background-color: #ededed;
      font-size: 22px;
      color: #666;
      vertical-align: top;
    }
    .separate {
      color: #ededed;
      font-size: 46px;
    }
  }
  .login-wrap {
    padding: 53px 33px;
  }
  .login-btn {
    width: 694px;
    height: 88px;
    background-color: #6db4fb;
  }
}
</style>
