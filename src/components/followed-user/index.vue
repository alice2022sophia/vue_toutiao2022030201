<template>
    <van-button v-if="isFollowed" round :loading="isFollowLoading" @click="onFollow">
      已关注
    </van-button>
    <van-button v-else color="#3296fa" round :loading="isFollowLoading" @click="onFollow">
      <van-icon slots="icon" name="plus" />
      关注
    </van-button>
</template>
<script>
import { addFollowed, deleteFollowed } from '@/api/user'
export default {
  name: 'followedUser',
  components: {

  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      isFollowLoading: false
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
    async onFollow() {
      this.isFollowLoading = true
      try {
        if (this.isFollowed) {
          await deleteFollowed(this.userId)
        } else {
          await addFollowed(this.userId)
        }
        this.$emit('update:isFollowed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败,请稍后再试 !'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.isFollowLoading = false
    }
  }
}
</script>
<style lang="less" scoped></style>
