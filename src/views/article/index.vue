<template>
  <div class="articles-container">
    <van-nav-bar class="login-in-btn" title="文章详情">
      <van-icon slot="left" name="arrow-left" @click="goBack" size="0.5rem"/>
    </van-nav-bar>
    <div class="main-wrap">
      <div v-if="loading" class="loading-wrap">
        <van-loading vertical>加载中...</van-loading>
      </div>
      <div v-else-if="article.title" class="article">
        <h1>{{article.title}}</h1>
        <van-cell class="author">
          <div class="author-info">
            <van-image
              class="avatar"
              slots="icon"
              round
              fit="cover"
              :src="article.aut_photo"
            />
            <div slots="title">
              <p>{{article.aut_name}}</p>
              <span>{{article.pubdate | relativeTimeFormat}}</span>
            </div>
          </div>
          <followed-user class="followed" :isFollowed.sync="article.is_followed" :userId="article.aut_id" /> <!--$event代表事件传递的参数-->
        </van-cell>
        <div class="article-content markdown-body" v-html="article.content" ref="articleContentRef">
        </div>
        <div class="favoriate">
          <h2>猜你喜欢</h2>
          <van-grid :column-num="2" :border="false">
            <van-grid-item v-for="value in 6" :key="value">
              <span slots="text">微信小程序微信小程序微信小程序微信小程序微信小程序微信小程序</span>
            </van-grid-item>
          </van-grid>
        </div>
        <van-grid :column-num="2" class="like-delete" :border="false">
          <van-grid-item >
            <van-button class="like-delete-btn" round>
              <i slots="icon" class="toutiao toutiao-dianzan" />
              点赞
            </van-button>
          </van-grid-item>
          <van-grid-item >
            <van-button class="like-delete-btn" round>
              <i slots="icon" class="toutiao toutiao-shanchu" />
              不喜欢
            </van-button>
          </van-grid-item>
        </van-grid>
        <comment-article :source="article.art_id" @onLoadedSuccess="commentTotal = $event.total_count" :commentArticleList="commentArticleList" @updateCommentArticleList="updateCommentArticleList" @replyClick="onReplyClick"/>
        <div class="articles-footer">
          <van-button class="comment-btn" round @click="isPopShow = true">写评论</van-button>
          <i slots="icon" class="comment-icon toutiao toutiao-pinglun">
            <span>{{commentTotal}}</span>
          </i>
          <collect-article  class="collect" :isCollected.sync="article.is_collected" :articleId="article.art_id"/>
          <like-article  class="collect" :isLiked.sync="article.attitude" :articleId="article.art_id"/>
          <i slots="icon" class="toutiao toutiao-fenxiang"></i>
        </div>
        <van-popup v-model="isPopShow" position="bottom">
          <comment-post :target="article.art_id" @postSuccess="onPostSuccess"/>
        </van-popup>
      </div>
      <div v-else-if="errStatus === 404" class="no-resource">
        <i slots="icon" class="toutiao toutiao-shanchuwenjian"></i>
        <p>资源不存在或已删除</p>
      </div>
      <div v-else class="network-error">
        <i slots="icon" class="toutiao toutiao-wuwangluo"></i>
        <p>亲,网络不给力哦~</p>
        <van-button class="retry" @click="loadArticle">点击重试</van-button>
      </div>
    </div>
    <van-popup v-model="isReplyShow" position="bottom" :style="{ height: '100%' }" >
      <comment-reply v-if="isReplyShow" :comment="currentComment" @close="isReplyShow = false" @updateComment="currentComment = $event" @updateCurrentComment="updateCurrentComment"/>
    </van-popup>
  </div>
</template>
<script>
import { getArticleById } from '@/api/articles'
import { ImagePreview } from 'vant'
import FollowedUser from '@/components/followed-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentArticle from '@/views/article/components/comment-article'
import CommentPost from '@/views/article/components/comment-post'
import CommentReply from '@/views/article/components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: {
    FollowedUser,
    CollectArticle,
    LikeArticle,
    CommentArticle,
    CommentPost,
    CommentReply
  },
  provide: function() {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      commentTotal: 0,
      isPopShow: false,
      commentArticleList: [],
      isReplyShow: false,
      currentComment: {}
    }
  },
  watch: {

  },
  computed: {

  },
  created() {
    this.loadArticle()
  },
  mounted() {
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async loadArticle() {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // if (Math.random() > 0.5) {
        //   JSON.parse('dklsfjdksjfkdjflkdj')
        // }
        this.article = data.data
        setTimeout(this.getImgPreview, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取文章详情数据失败,请稍后再试 !')
      }
      this.loading = false
    },
    getImgPreview() {
      const imgs = this.$refs.articleContentRef && this.$refs.articleContentRef.querySelectorAll('img')
      const imagesUrl = []
      imgs.forEach((img, index) => {
        imagesUrl.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images: imagesUrl,
            startPosition: index
          })
        }
      })
    },
    onPostSuccess(data) {
      this.isPopShow = false
      this.commentArticleList.unshift(data.new_obj)
    },
    updateCommentArticleList(data) {
      this.commentArticleList = data
    },
    onReplyClick(comment) {
      this.isReplyShow = true
      this.currentComment = comment
    },
    updateCurrentComment(data) {
      // this.currentComment.reply_count += data
      this.currentComment.reply_count++
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/styles/github-markdown.css";
.articles-container {
  background-color: #fff;
  height: 100%;
  padding-top: 92px;
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .main-wrap {
    padding: 32px 36px 100px 25px;
    .loading-wrap {
      display: flex;
      padding: 500px 0 800px;
      align-items: center;
      justify-content: center;
    }

    .article {
      h1 {
        font-size: 40px;
        line-height: 65px;
      }
  /deep/ .author {
          padding: 32px 0 27px 0;
          .van-cell__value {
            display:flex;
            align-items: center;
            justify-content: space-between;
          }
          .author-info {
            display: flex;
            align-items: center;
            .avatar {
              width: 79px;
              height: 79px;
              margin-right: 18px;
            }
            p {
              margin: 17px 0 0 0;
              font-size: 24px;
              font-weight: 400;
              line-height: 24px;
              color: #333;
            }
            span {
              font-size: 22px;
              color: #b4b4b4;
            }
          }
          .followed {
            padding: 0;
            width: 139px;
            height: 52px;
            font-size: 25px;
            color: #333;
          }
        }
        .article-content {
          width: 688px;
          font-size: 32px;
          line-height: 60px;
        }
  /deep/ .favoriate {
            h2 {
              font-size: 30px;
              line-height: 65px;
              color:#333;
              margin: 4px 0 0 0;
            }
            .van-grid-item__content {
              font-size: 30px;
              padding-top: 15px;
              padding-bottom: 15px;
              color: #666;
            }
          }
  /deep/  .like-delete {
            padding: 0 145px;
            .van-grid-item__content {
              padding-top: 28px;
            }
            .like-delete-btn {
              width: 156px;
              height: 58px;
              font-size: 25px;
              color: #666;
              padding: 0;
              text-align: center;
              .toutiao {
                font-size: 28px;
              }
            }

          }
    }
    .network-error,
    .no-resource {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 400px 0 700px;
      font-size: 30px;
      color: #666;
      .toutiao {
        color: #b4b4b4;
        font-size: 141px;
      }
      .retry {
        width: 280px;
        height: 70px;
      }
    }

  }
    .articles-footer{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 750px;
      padding: 20px 38px 12px 25px;
      border-top: 1px solid #d8d8d8;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      box-sizing: border-box;
/deep/  .comment-btn {
          width: 399px;
          height: 64px;
          border: 2px solid #eee;
          color: #a7a7a7;
          font-size: 30px;
          text-align: left;
          .van-button__content {
            justify-content: flex-start;
          }
        }
/deep/  .toutiao {
          font-size: 42px;
          color: #777;
        }
        .comment-icon {
          position: relative;
          span {
            position: absolute;
            top: -17px;
            right: -13px;
            padding: 4px;
            background-color: #e22829;
            line-height: 26px;
            color: #fff;
            font-size: 10px;
            text-align: center;
            border-radius: 16px;
          }
        }
        .collect {
          width: 42px;
          height: 42px;
          padding: 0;
          margin: 0;
        }
    }

}
</style>
// <style lang="less">
// .article-content {
//   width: 688px;
//   font-size: 32px;
//   line-height: 60px;

//   div,
//   p,
//   span,
//   i,
//   pre,
//   code {
//     white-space: normal;
//     word-break: break-all;
//       img {
//         max-width: 100%;
//       }
//   }
// }
// </style>
