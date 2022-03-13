<template>
  <div class="channel-edit">
    <van-cell class="my-channel" :border="false">
      <template #title>
        <span>我的频道</span>
      </template>
      <van-button type="danger" plain round size="mini" class="edit-btn" @click="isEdit = !isEdit">{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="channel-content">
      <van-grid-item v-for="(channel, index) in myChannels" :key="channel.id" @click="onMyChannelsClick(channel, index)">
        <i v-show="isEdit && !(fixChannels.includes(channel.id))" slot="icon" class="toutiao toutiao-guanbi2"></i>
        <span slot="text" :class="{active: index===active}">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <van-cell class="my-channel" :border="false">
      <template #title>
        <span>频道推荐</span>
      </template>
    </van-cell>
    <van-grid :gutter="10" class="recommend-channel">
      <van-grid-item v-for="recommendChannel in recommendChannels" :key="recommendChannel.id" :text="recommendChannel.name" @click="onAddChannel(recommendChannel)">
        <i slot="icon" class="toutiao toutiao-jiahao"></i>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { getAllChannels, addMyUserChannels, removeChannelById } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {

  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fixChannels: [0]
    }
  },
  watch: {

  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }

  },
  created() {
    this.loadAllChannels()
  },
  mounted() {

  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败!')
      }
    },
    async onAddChannel(channel) {
      this.$emit('addChannel', channel)
      if (this.user) {
        try {
          await addMyUserChannels({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          this.$toast('存储用户频道失败,请稍后再试!')
        }
      } else {
        setItem('toutiaoChannels', this.myChannels)
      }
    },
    onMyChannelsClick(channel, index) {
      if (this.isEdit) {
        if (this.fixChannels.includes(channel.id)) {
          return
        }
        this.$emit('deleteChannel', index)
        if (index <= this.active) {
          this.$emit('activeChannel', channel, (this.active - 1), true)
        }
        this.deleteMyChannels(channel.id)
      } else {
        this.$emit('activeChannel', channel, index, false)
      }
    },
    async deleteMyChannels(channelId) {
      try {
        if (this.user) {
          await removeChannelById(channelId)
        } else {
          setItem('toutiaoChannels', this.myChannels)
        }
      } catch (err) {
        this.$toast('删除用户频道失败!')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding: 70px 22px;
  .my-channel {
    padding-top: 15px;
    padding-bottom: 46px;
    .van-cell__title {
      font-size: 32px;
      color: #333;
      line-height: 59px;
    }
    .edit-btn {
      height: 48px;
      width: 104px;
      font-size: 26px;
      color: #f85a5a;
      border: 1px solid #f85a5a;
    }

  }
/deep/ .van-grid {
          .van-grid-item {
            .van-grid-item__content {
              background-color: #f4f5f6;
              font-size: 28px;
              color: #222;
              .active {
                color: #f85a5a;
              }
            }
          }
        }
/deep/  .channel-content {
          padding-bottom: 59px;
          .van-grid-item__icon-wrapper {
            position: absolute;
            top: -5px;
            right: -5px;
            color: #222;
            font-size: 15px;
            z-index: 2;
          }
        }
/deep/  .recommend-channel {
          .van-grid-item__content {
            flex-direction: row;
            .van-grid-item__icon-wrapper {
              margin-right: 6px;
              font-size: 22px;
            }
            // .van-grid-item__text {
            //   white-space: nowrap;
            // }
          }

        }
}

</style>
