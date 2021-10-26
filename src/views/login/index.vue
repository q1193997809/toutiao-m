<template>
  <div class="login-container">
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入手机验证码"
        type="number"
        maxlength="6"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <!-- 验证码按钮 -->
        <template #button>
          <!-- 倒计时 -->
          <van-count-down :time="4000" format="ss s" @finish="isCutDoneShow = false" v-if="isCutDoneShow" />
          <van-button size="small" round class="send-sms-btn" native-type="button" @click="onsendSms" v-else>获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI, sendSmsAPI } from '@/api'
export default {
  name: 'loginIndex',
  data () {
    return {
      isCutDoneShow: false,
      user: {
        mobile: '13011111111', // 手机号
        code: '246810' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      }
    }
  },
  methods: {
    onClickLeft () {},
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '正在登录'
      })
      try {
        const { data } = await loginAPI(user)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('验证码或手机号错误')
          // console.log('验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onsendSms () {
      try {
        // 校验手机号
        await this.$refs.loginForm.validate('mobile')
        // 验证通过使用倒计时
        this.isCutDoneShow = true
      } catch (err) {
        return
      }
      // 请求发送验证码
      try {
        await sendSmsAPI(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast.fail('发送太频繁，请稍后再试')
        } else {
          this.$toast.fail('发送失败，请稍后再试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    padding: 0;
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    margin: 53px 33px;
    .login-btn {
      width: 694px;
      height: 88px;
      border-radius: 10px;
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
