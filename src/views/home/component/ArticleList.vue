<template>
  <div class="article-list-wrap">
    <van-pull-refresh v-model="isLoading"
    :success-text="refreshText"
    @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItems v-for="(obj, index) in list" :key="index" :airtile="obj"></ArticleItems>
        <!-- <van-cell v-for="(arr, index) in list" :key="index" :title="arr.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItems from '@/components/article-items'
export default {
  components: {
    ArticleItems
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      refreshText: ''
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // console.log(this.list)
        // if (Math.random() > 0.5) {
        //   JSON.parse('1sdssdas')
        // }
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，将 finished 设置为 true，不再 load 加载更多了
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      this.finished = false
      // this.loading = true
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // console.log(this.channel.name)
        // if (Math.random() > 0.5) {
        //   JSON.parse('1sdssdas')
        // }
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.loading = false
        this.refreshText = `更新了${results.length}条数据`
      } catch (err) {
        this.refreshText = '失败'
        this.isLoading = false
        this.loading = false
      }
    }
  }
}
</script>

<style>
.article-list-wrap {
  height: 79vh;
  overflow-y: auto;
}
</style>
