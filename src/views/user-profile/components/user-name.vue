<template>
  <div class="user-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UserName',
  components: {},

  props: {
    username: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      localName: this.username
    }
  },

  watch: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          return
        }
        await updateUserProfile({
          name: localName
        })
        this.$emit('updataUsername', localName)
        this.$emit('close')
        this.$toast.success('修改昵称成功!')
      } catch (err) {
        this.$toast.fail('修改昵称失败,请稍后再试!')
      }
    }
  }
}

</script>
<style lang='less' scoped>
.user-name {
  .field-wrap {
    padding: 20px;
  }

}
</style>
