<template>
  <div class="search-list">
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="加载失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article) in list" :key="article.art_id" :title="article.title" />
    </van-list>
  </div>
</template>
<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchList',
  components: {

  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
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
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        // if (Math.random() < 0.5) {
        //   JSON.parse('djfljdlkjf')
        // }
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length > 0) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast('获取搜索结果失败,请稍后再试!')
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
