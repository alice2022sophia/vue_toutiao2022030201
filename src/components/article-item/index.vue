<template>
  <van-cell
    class="article-details"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
    }"
    >
    <template #title>
      <span class="van-multi-ellipsis--l2">{{article.title}}</span>
    </template>
    <template #label>
      <div v-if="article.cover.images && article.cover.images.length === 3" class="cover-wrap">
        <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image
            fit="cover"
            class="cover-img"
            :src="img"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}} 评论</span>
        <span>{{article.pubdate | relativeTimeFormat}}</span>
      </div>
    </template>
    <template #default v-if="article.cover.images && article.cover.images.length === 1">
      <van-image
        fit="cover"
        class="cover-right"
        :src="article.cover.images[0]"
      />
    </template>
  </van-cell>
</template>
<script>
export default {
  name: 'ArticleItem',
  components: {
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

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

  }
}
</script>
<style lang="less" scoped>
.article-details {
  .van-cell__value {
    flex: unset;
    width: 267px;
    height: 215px;
    margin-left: 25px;
    .cover-right {
      width: 267px;
      height: 215px;
    }
  }
  .label-info-wrap span {
    font-size: 24px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 25px 0;
    .cover-item {
      flex: 1;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-img {
        width: 100%;
        height: 146px;
      }
    }
  }

}
</style>
