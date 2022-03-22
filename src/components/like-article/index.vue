<template>
  <van-button @click="onLike" :loading="isLoading">
    <i slots="icon" :class="{liked: isLiked === 1, toutiao: true, 'toutiao-dianzan': isLiked !== 1, 'toutiao-dianzan1': isLiked === 1}"></i>
  </van-button>
</template>
<script>
import { addLiked, deleteLiked } from '@/api/user'
export default {
  name: 'LikeArticle',
  components: {},
  props: {
    isLiked: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  watch: {},
  computed: {},
  created() {

  },
  mounted() {

  },
  methods: {
    async onLike() {
      this.isLoading = true
      let status = -1
      try {
        if (this.isLiked === 1) {
          await deleteLiked(this.articleId)
        } else {
          await addLiked(this.articleId)
          status = 1
        }
        this.$emit('update:isLiked', status)
        this.$toast.success(status === 1 ? '已点赞' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败,请稍后再试 !')
      }
      this.isLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
.van-button {
  border: none;
  .liked {
    color: #ff7b00 !important;
  }
}
</style>
