<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="clearHistory">全部删除</span>
        <span class="finish" @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else slots="right-icon" name="delete-o" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="clickHistory(history, index)">
      <template #right-icon >
        <van-icon v-show="isDeleteShow" name="close" />
      </template>
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'SearchHistory',
  components: {

  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
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
    clickHistory(history, index) {
      if (this.isDeleteShow) {
        this.$emit('updateSearchHistories', index)
      } else {
        this.$emit('searchHistoryContent', history)
      }
    },
    clearHistory() {
      this.$emit('clearHistories', [])
    }
  }
}
</script>
<style lang="less" scoped>
.search-history {
  .van-icon {
    padding-top: 12px;
    font-size: 26px;
  }
  .finish {
    padding-left: 40px;
  }

}
</style>
