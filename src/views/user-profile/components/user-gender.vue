<template>
  <div class="user-gender">
    <van-picker show-toolbar title="性别" :columns="columns" :default-index="gender" @cancel="$emit('close')" @confirm="onUpdateGender" @change="onChange"/>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UserGender',
  components: {},

  props: {
    gender: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      columns: ['男', '女'],
      localGender: this.gender
    }
  },

  watch: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    async onUpdateGender() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserProfile({
          gender: this.localGender
        })
        this.$emit('updateUserGender', this.localGender)
        this.$emit('close')
        this.$toast.success('修改用户个人信息成功!')
      } catch (err) {
        this.$toast.fail('修改用户个人信息失败,请稍后再试!')
      }
    },
    onChange(picker, value, index) {
      this.localGender = index
    }
  }
}

</script>
<style lang='less' scoped>
</style>
