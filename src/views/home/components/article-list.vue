<template>
  <div class="article-container">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item v-for="(article, index) in list" :key="index" :article="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { loadChannelsList } from '@/api/articles'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      newTimeStamp: '',
      error: false,
      isRefreshLoading: false,
      refreshText: '刷新成功'
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
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await loadChannelsList({
          channel_id: this.channel.id,
          timestamp: this.newTimeStamp || Date.now()
        })
        // 人为制造错误
        // if (Math.random() > 0.5) {
        //   JSON.parse('jjkjjkjlkj')
        // }
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.newTimeStamp = data.data.pre_timestamp
        } else {
          this.loading = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const { data } = await loadChannelsList({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsjfkjdskfjkd')
        // }
        const { results } = data.data
        this.list.unshift(...results)
        this.refreshText = `刷新成功,更新了${results.length}条数据!`
        this.isRefreshLoading = false
      } catch (err) {
        this.refreshText = '刷新失败!'
        this.isRefreshLoading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .article-container {
    height: 79vh;
    overflow-y: auto;
  }
</style>
