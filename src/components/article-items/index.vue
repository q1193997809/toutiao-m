<template>
  <div class="article-wrap">
     <van-cell class="article">
       <div slot="title" class="title van-multi-ellipsis--l2">{{airtile.title}}</div>
       <div slot="label">
          <div class="muliImg"  v-if="airtile.cover.type === 3" >
            <van-image
              v-for="(imgUrl, index) in airtile.cover.images" :key="index"
              class="img"
              fit="cover"
              :src="imgUrl"
            />
          </div>
          <div class="lable">
            <span>{{airtile.aut_name}}</span>
            <span>{{airtile.comm_count}}</span>
            <span>{{airtile.pubdate | relativeTime}}</span>
          </div>
       </div>
       <van-image
          class="oneImg"
          v-if="airtile.cover.type === 1"
          slot="default"
          fit="cover"
          :src="airtile.cover.images[0]"
        />
     </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    airtile: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article{
  .title{
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value{
    flex: unset;
    width: 232px;
    height: 146px;
  }
  .oneImg{
    width: 100%;
    height: 146px;
    padding-left: 30px;
  }
  .muliImg{
    display: flex;
    padding: 30px 0;
    .img {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .lable {
    span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
  }
}

</style>
