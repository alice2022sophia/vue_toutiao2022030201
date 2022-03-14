<template>
  <div class="search-suggestion">
    <van-cell v-for="(suggestion, index) in searchSuggestions" :key="index" @click="$emit('search', suggestion)">
      <template #icon>
        <van-icon name="search" />
      </template>
      <template #title>
        <div v-html=heighLight(suggestion)></div>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { debounce } from 'lodash'
import { getSearchSuggestion } from '@/api/search'
export default {
  name: 'SearchSuggestion',
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
      searchSuggestions: []
    }
  },
  watch: {
    searchText: {
      handler: debounce(function(val) {
        this.loadSearchSuggestion(val)
      }, 300),
      immediate: true
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.searchSuggestions = data.data.options
      } catch (err) {
        this.$toast('获取搜索建议失败,请稍后再试!')
      }
    },
    heighLight(str) {
      const htmlStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return str && str.replace(reg, htmlStr)
    }
  }
}
</script>
<style lang="less" scoped>
.search-suggestion {
  .van-icon {
    padding-top: 12px;
    font-size: 26px;
  }
/deep/.van-cell__title {
        span.active {
          color: #3296fa;
        }
      }

}
</style>
