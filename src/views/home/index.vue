<template>
  <div class="homeContainer">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button slot="title" type="info" class="search-btn" round>
        <i slot="icon" class="iconfont icon-sousuo"></i>
        <span class="search-text">搜索</span>
      </van-button>
    </van-nav-bar>
    <van-tabs  class="van-tabs">
      <van-tab :title="obj.name" class="tab-cell" v-for="obj in channels" :key="obj.id">
        <ArticleList :channel="obj"></ArticleList>
      </van-tab>
      <!-- <div slot="nav-right" class="placholder"></div> // 另一种解决右边距问题-->
      <div slot="nav-right" class="hunbueger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api'
import ArticleList from '@/views/home/component/ArticleList'
export default {
  components: {
    ArticleList
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannelsAPI()
        this.channels = data.data.channels
        // console.log(data)
      } catch (err) {
        this.$toast('获取失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.homeContainer{
  padding-bottom: 100px;
}
/deep/ .page-nav-bar{
  .van-nav-bar__title{
    max-width: 80%;
  }
  .search-btn{
    height: 64px;
    width: 555px;
    border: none;
    background-color: #5babfb !important;
    i.icon-sousuo{
      font-size: 32px;
    }
  }
}
/deep/ .van-tabs{
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  z-index: 1;
  .van-tabs__wrap{
    height: 82px;
  }
  .van-tab{
    min-width: 200px;
    // background-color: pink;
    border-right: 1px solid #edeff3;
    font-size: 30px;
    color: #777;
    // &:last-child{
    //   background-color: pink;
    // }
  }
  .van-tab--active{
    color: #333;
  }
  .van-tabs__line{
      width: 31px !important;
      height: 6px !important;
      background-color: #3296fa;
      bottom: 8px;
  }
  .van-tabs__nav{
    padding: 0 66px 0 0;
  }
  .hunbueger-btn{
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.iconfont{
      font-size: 33px;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      background-image: url(~@/assets/gradient-gray-line.png);
      width: 1px;
      height: 100%;
    }
  }
  // .placholder {
  //   width: 66px;
  //   flex-shrink: 0;
  // }
}

</style>
