<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="comment.reply_count ? `${comment.reply_count} 条回复` : '暂无回复'"
    >
      <van-icon slot="left" name="cross" @click="$emit('close')"/>
    </van-nav-bar>
    <div class="comment-wrap">
      <comment-items class="all-reply" :commentItem="comment" @updateComment="$emit('updateComment', $event)" />
      <van-cell title="全部回复"/>
      <comment-article class="all-reply" :source="comment.com_id" :type="'c'" :commentArticleList="commentArticleList" @updateCommentArticleList="updateCommentArticleList"/>
      <!-- <comment-article class="all-reply" :source="comment.com_id" :type="'c'" :commentArticleList="commentArticleList" @updateCommentArticleList="updateCommentArticleList" @replyClick="onReplyClick"/> -->
    </div>
    <div class="post-wrap">
      <van-button class="post-btn" round @click="onPostShow">写评论</van-button>
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post :target="comment.com_id" @postSuccess="postSuccess" />
    </van-popup>

  </div>
</template>

<script>
import CommentItems from '@/views/article/components/comment-items'
import CommentArticle from '@/views/article/components/comment-article'
import CommentPost from '@/views/article/components/comment-post'
export default {
  name: 'CommentReply',
  components: {
    CommentItems,
    CommentArticle,
    CommentPost
  },

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      commentArticleList: [],
      // currentComment: {},
      isPostShow: false
    }
  },

  watch: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    updateCommentArticleList(data) {
      this.commentArticleList = data
    },
    // onReplyClick(comment) {
    //   this.isReplyShow = true
    //   this.currentComment = comment
    // },
    onPostShow() {
      this.isPostShow = true
    },
    postSuccess(data) {
      this.$emit('updateCurrentComment', 1)
      this.isPostShow = false
      this.commentArticleList.unshift(data.new_obj)
    }
  }
}

</script>
<style lang='less' scoped>
.comment-reply {
  .all-reply {
    padding: 0 0 0 30px;
  }
  .comment-wrap {
    position: fixed;
    top: 92px;
    bottom: 88px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .post-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .post-btn {
      width: 60%;
    }
  }
}

</style>
