<template>
  <div class="home-container">
    <van-nav-bar class="login-in-btn" fixed>
      <van-button class="home-search" slot="title" type="info" round size="small" icon="search">搜索</van-button>
    </van-nav-bar>
    <van-tabs class="tab-bars" v-model="active" animated swipeable border>
      <van-tab :title="item.name" :key="item.id" v-for="item in channels">
        <article-list :channel="item" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isPopupShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup
      v-model="isPopupShow"
      closeable
      position="bottom"
      close-icon-position="close-icon-position"
      :style="{ height: '100%' }"
    >
    <channel-edit
      :myChannels="channels"
      :active="active"
      @addChannel="addMyChannels"
      @activeChannel="activeChannel"
      @deleteChannel="deleteChannel"
    />
    </van-popup>
  </div>
</template>
<script>
import { getUserChanels } from '@/api/user'
import { getItem } from '@/utils/storage'
import ArticleList from '@/views/home/components/article-list'
import ChannelEdit from '@/views/home/components/channel-edit'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isPopupShow: false
    }
  },
  watch: {

  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadChanels()
  },
  mounted() {

  },
  methods: {
    async loadChanels() {
      let channelsData = []
      try {
        if (this.user) {
          const { data } = await getUserChanels()
          channelsData = data.data.channels
        } else {
          const localChannels = getItem('toutiaoChannels')
          if (localChannels) {
            channelsData = localChannels
          } else {
            const { data } = await getUserChanels()
            channelsData = data.data.channels
          }
        }
        this.channels = channelsData
      } catch (err) {
        this.$toast('获取频道数据失败!')
      }
    },
    addMyChannels(channel) {
      this.channels.push(channel)
    },
    activeChannel(channel, index, isPopupShow = true) {
      this.active = index
      this.isPopupShow = isPopupShow
    },
    deleteChannel(index) {
      this.channels.splice(index, 1)
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
/deep/ .login-in-btn {
    .van-nav-bar__title {
      max-width: unset;
      .home-search {
        width: 555px;
        height: 64px;
        background-color: #5babfb;
        border: none;
        font-size: 28px;
        .van-icon {
          font-size: 32px;
        }
      }
    }
  }
/deep/ .tab-bars {
        .van-tabs__wrap {
          position: fixed;
          top: 92px;
          left: 0;
          right: 0;
          height: 82px;
          z-index: 10;
          .van-tab {
            border-right: 1px solid #edeff3;
            min-width: 200px;
            color: #777;
            font-size: 28px;
          }
          .van-tab--active {
            font-size: 30px;
            color: #333;
          }
          .van-tabs__line {
            width: 31px;
            height: 6px;
            bottom: 38px;
            background-color: #3296fa;
          }

        }
        .hamburger-btn {
          position: fixed;
          right: 0;
          width: 67px;
          height: 82px;
          padding-left: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          opacity: 0.902;
          box-sizing: border-box;
          i.toutiao {
            font-size: 40px;
          }
          &:before {
            content: "";
            position: absolute;
            left: 0;
            width: 1px;
            height: 82px;
            background-image: url('~@/assets/gradient-gray-line.png');
            background-size: contain;
          }
        }
        .placeholder {
          flex-shrink: 0;
          width: 67px;
          height: 82px;

        }
      }
}
/deep/ .van-popup {
  .van-icon{
    top: 29px;
    left: 29px;

  }

}

</style>
