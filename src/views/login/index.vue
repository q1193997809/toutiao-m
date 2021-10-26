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
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="密码"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
export default {
  name: 'loginIndex',
  methods: {
    onClickLeft () {}
  }
}
</script>

<style>

</style>
