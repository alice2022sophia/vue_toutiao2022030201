<template>
  <van-cell class="comment-item">
    <van-image
      class="avatar"
      slots="icon"
      fit="cover"
      round
      :src="commentItem.aut_photo"
    />
    <div class="comment-info">
      <div slot="title" class="user-info">
        <p>{{commentItem.aut_name}}</p>
        <van-button @click="onCommentLike" :loading="islikeLoading">
          <i slots="icon" :class="{liked: commentItem.is_liking, toutiao: true, 'toutiao-dianzan2': !commentItem.is_liking, 'toutiao-dianzan4': commentItem.is_liking}"></i>
          <span>{{commentItem.like_count || '赞'}}</span>
        </van-button>
      </div>
      <div class="content-info" slots="label">
        <p class="comment-content">{{commentItem.content}}</p>
        <div class="pubdate-reply">
          <span>{{commentItem.pubdate | relativeTimeFormat}}&nbsp;&middot;&nbsp;</span>
          <van-button class="reply" round @click="$emit('replyClick', commentItem)">{{commentItem.reply_count}}&nbsp;回复</van-button>
        </div>
      </div>
    </div>
  </van-cell>
</template>
<script>
import _ from 'lodash'
import { addCommentLike, deleteCommentlike } from '@/api/comments'
export default {
  name: 'CommentItems',
  components: {

  },
  props: {
    commentItem: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      islikeLoading: false,
      newComment: {}
    }
  },
  watch: {
  },
  computed: {

  },
  created() {
    // this.loadComment()
  },
  mounted() {

  },
  methods: {
    loadComment() {
      this.newComment = _.cloneDeep(this.commentItem)
    },
    async onCommentLike() {
      this.loadComment()
      this.islikeLoading = true
      try {
        if (this.commentItem.is_liking) {
          await deleteCommentlike(this.commentItem.com_id)
          this.newComment.like_count = this.newComment.like_count > 0 ? (this.newComment.like_count - 1) : this.newComment.like_count
        } else {
          await addCommentLike(this.commentItem.com_id)
          this.newComment.like_count++
        }
        this.newComment.is_liking = !this.newComment.is_liking
        this.$emit('updateComment', this.newComment)
      } catch (err) {
        this.$toast.fail('操作失败,请稍后再试 !')
      }
      this.islikeLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
.comment-item {
  padding-left: 0;
  padding-right: 0;
/deep/  .van-cell__value {
          width: 687px;
          display: flex;
          justify-content: space-between;
          .avatar {
            margin-top: 20px;
            width: 72px;
            height: 72px;
          }
          .comment-info {
            width: 585px;
            .user-info {
              display: flex;
              justify-content: space-between;
              font-size:28px;
              color: #406599;
              align-items: center;
              .van-button {
                border: none;
                background-color: #fff;
                &::before {
                  background-color: #fff;
                }
                .toutiao {
                  font-size: 36px;
                  color: #666;
                }
                .liked {
                  color: #ff7300
                }
                span {
                  margin-left: 5px;
                  color: #666;
                }
              }
            }
            .content-info {
              .comment-content {
                margin: 0 100px 18px 0;
                font-size: 32px;
                line-height: 50px;
                color: #222;
              }
              .pubdate-reply {
                display: flex;
                align-items: center;
              }
              .reply {
                height: 48px;
                padding: 0 20px;
                background-color: #f4f5f6;
                font-size: 22px;
              }
            }
          }
        }
}
</style>
