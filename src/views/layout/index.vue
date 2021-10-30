<template>
  <div class="layoutContainer">
    <router-view/>
    <van-tabbar route class="layout-wrap">
      <van-tabbar-item replace to="/" class="layout-tabbar">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/qa" class="layout-tabbar">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video" class="layout-tabbar">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" class="layout-tabbar">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text">{{$store.state.user?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.layout-wrap{
  .layout-tabbar{
    .iconfont{
      font-size: 40px;
    }
    .text{
      font-size: 22px;
    }
  }
}
</style>
