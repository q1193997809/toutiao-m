<template>
  <div class="myContainer">
    <div class="header login" v-if="user">
      <div class="user-info">
        <div class="user-image">
          <van-image
            class="logImage"
            round
            fit="cover"
            :src="userInfo.photo"
          />
          <span class="username">{{userInfo.name}}</span>
        </div>
        <van-button size="mini" round>编辑资料</van-button>
      </div>
      <div class="user-data-wrap">
        <van-row>
          <van-col span="6" class="user-data" type="flex">
            <span class="user-data-text">{{userInfo.art_count}}</span>
            <span class="user-data-text">头条</span>
          </van-col>
          <van-col span="6" class="user-data" type="flex">
            <span class="user-data-text">{{userInfo.follow_count}}</span>
            <span class="user-data-text">关注</span>
          </van-col>
          <van-col span="6" class="user-data" type="flex">
            <span class="user-data-text">{{userInfo.fans_count}}</span>
            <span class="user-data-text">粉丝</span>
          </van-col>
          <van-col span="6" class="user-data" type="flex">
            <span class="user-data-text">{{userInfo.like_count}}</span>
            <span class="user-data-text">获赞</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="header not-login" v-else>
      <div class="loginbtn" @click="$router.push('login')">
        <van-image
        class="notlogImage"
        round
        :src="notloginImage"
      />
      <span class="text">登录 / 注册</span>
      </div>
    </div>
    <div class="collect-history-warp">
      <van-grid :column-num="2" clickable>
        <van-grid-item icon="photo-o" text="收藏" class="collect-history">
          <i slot="icon" class="iconfont icon-shoucang"></i>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="历史" class="collect-history">
          <i slot="icon" class="iconfont icon-lishi"></i>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell title="退出登录" class="login-out" v-if="user"
      @click="clickLoginOut"
      clickable />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfoAPI } from '@/api'

export default {
  data () {
    return {
      notloginImage: require('@/assets/mobile.png'),
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    clickLoginOut () {
      this.$dialog.confirm({
        title: '确认退出么？'
      }).then(() => {
        // on confirm
        this.$store.commit('setUser', null)
      }).catch(() => {
        // on cancel
      })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
        // console.log(data.data)
      } catch (err) {
        this.$toast('获取信息失败，请稍后重试')
      }
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style scoped lang="less">
.header{
  height: 360px;
  background-image: url("~@/assets/banner.png");
}
.not-login{
  display: flex;
  justify-content: center;
  align-items: center;
  .loginbtn{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px auto;
    .notlogImage{
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text{
      color: #fff;
      font-size: 28px;
    }
  }
}
.login{
  .user-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 230px;
    margin: 0 32px;
    .user-image{
      display: flex;
      align-items: center;
      .logImage{
        height: 132px;
        width: 132px;
        margin-right: 24px;
        border: 2px solid #fff;
      }
      .username{
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .user-data-wrap{
    height: 130px;
    .user-data{
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .user-data-text{
        display: flex;
        justify-content: center;
        font-size: 40px;
        color: #fff;
      }
      .user-data-text:nth-child(2){
        font-size: 25px;
      }
      .user-data-text:first-child{
        margin-top: 20px;
      }
    }
  }
}
.collect-history-warp{
  .collect-history{
    height: 140px;
    font-size: 28px;
    line-height: 60px;
    .iconfont{
      font-size: 45px;
    }
    .icon-shoucang{
      color: #eb5253;
    }
    .icon-lishi{
      color: #ff9d1d;
    }
  }
}
.login-out{
  text-align: center;
  color: #eb5253;
}
</style>
