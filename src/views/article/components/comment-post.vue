<template>
  <div class="comment-post">
    <van-field
      class="post-content"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="100"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length">发布</van-button>
  </div>
</template>
<script>
import { addComment } from '@/api/comments'
export default {
  name: 'CommentPost',
  components: {

  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: ''
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
    async onPost() {
      this.$toast.loading({
        message: '评论发表中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId
        })
        this.$emit('postSuccess', data.data)
        this.$toast.success('发表评论成功')
        this.message = ''
      } catch (err) {
        this.$toast.fail('发表评论失败,请稍后再试')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: flex-end;
  padding: 20px;
  .post-content {
    background-color: #f2f2f2;
  }
  .post-btn {
    width: 200px;
    height: 176px;
    border: none;
    color: #79B2F5;
    &::before {
      background-color: #fff;
    }
  }
}
</style>
