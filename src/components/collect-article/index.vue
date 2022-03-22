<template>
  <van-button :loading="loading" @click="onCollect">
    <i slots="icon" :class="{collected: isCollected, toutiao: true, 'toutiao-shoucang': !isCollected, 'toutiao-shoucang-shoucang': isCollected}"></i>
  </van-button>
</template>
<script>
import { addCollected, deleteCollected } from '@/api/user'
export default {
  name: 'CollectArticle',
  components: {

  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
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
    async onCollect() {
      this.loading = true
      try {
        if (this.isCollected) {
          await deleteCollected(this.articleId)
        } else {
          await addCollected(this.articleId)
        }
        this.$emit('update:isCollected', !this.isCollected)
        this.$toast.success(!this.isCollected ? '已收藏文章' : '已取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败,请稍后再试 !')
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.van-button {
  border: none;
}
.collected {
  color: #fffb00 !important;
}
</style>
