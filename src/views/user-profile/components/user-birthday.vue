<template>
  <div class="user-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onUpdateBirthday"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UserBirthday',
  components: {},

  props: {
    birthday: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birthday)
    }
  },

  watch: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    async onUpdateBirthday() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      const currentBirthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      try {
        await updateUserProfile({
          birthday: currentBirthday
        })
        this.$emit('updateUserBirthday', currentBirthday)
        this.$emit('close')
        this.$toast.success('修改用户出生日期成功!')
      } catch (err) {
        this.$toast.fail('修改用户个人信息失败, 请稍后再试!')
      }
    }
  }
}

</script>
<style lang='less' scoped>
</style>
