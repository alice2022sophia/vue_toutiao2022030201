<template>
  <div class="comment-article">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="获取评论失败，点击重新加载"
      @load="onLoad"
      :immediate-check="false"
    >
      <comment-items v-for="comment in list" :key="comment.com_id" :commentItem="comment" @updateComment="updateComment" @replyClick="$emit('replyClick', $event)"/>
    </van-list>
  </div>
</template>
<script>
import { getComments } from '@/api/comments'
import CommentItems from '@/views/article/components/comment-items'
export default {
  name: 'CommentArticle',
  components: {
    CommentItems
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    isReplyShow: {
      type: Boolean,
      default: true
    },
    commentArticleList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator: (value) => {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  watch: {
    list: {
      handler: function() {
        this.$emit('updateCommentArticleList', this.list)
      },
      immediate: true
    },
    commentArticleList: {
      handler: function(newList) {
        this.list = newList
      },
      immediate: true,
      deep: true
    }
  },
  computed: {

  },
  created() {
    this.loading = true
    this.onLoad()
  },
  mounted() {

  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse('jdfkljdsfjldkjflk')
        // }
        const { results } = data.data
        this.$emit('onLoadedSuccess', data.data)
        this.list.push(...results)
        this.loading = false
        if (results.length > 0) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    updateComment(val) {
      const index = this.list.findIndex(item => {
        return item.com_id === val.com_id
      })
      this.list.splice(index, 1, val)
    }
  }
}
</script>
<style lang="less" scoped></style>
