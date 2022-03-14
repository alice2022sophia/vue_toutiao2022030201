<template>
  <div class="search-container">
    <form class="search-header" action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!--搜索结果-->
    <search-list v-if="isResultShow" :searchText="searchText" />
    <!--/搜索结果-->
    <!--搜索建议-->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />
    <!--/搜索建议-->
    <!--搜索历史-->
    <search-history
    :searchHistories="searchHistories"
    @updateSearchHistories="updateSearchHistories"
    @clearHistories="clearHistories"
    @searchHistoryContent="onSearch"
    v-else/>
    <!--/搜索历史-->
  </div>
</template>
<script>
import SearchHistory from '@/views/search/components/search-history'
import SearchList from '@/views/search/components/search-list'
import SearchSuggestion from '@/views/search/components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchList,
    SearchSuggestion
  },
  props: {

  },
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('toutiaoHistories') || []
    }
  },
  watch: {
    searchHistories(val) {
      setItem('toutiaoHistories', val)
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    onSearch(val) {
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
    updateSearchHistories(index) {
      this.searchHistories.splice(index, 1)
    },
    clearHistories(array) {
      this.searchHistories = array
    }
  }
}
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .van-search__content {
    background-color: #f4f5f6;
  }
  .search-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }

}
</style>
