<template>
  <div class="profile-container">
    <van-nav-bar
      class="login-in-btn"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden @change="onFileChange" ref="file">
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow = true"/>
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isUpdateGenderShow = true" />
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow = true" />
    <van-popup v-model="isUpdateNameShow" position="bottom" style="height: 100%">
      <user-name v-if="isUpdateNameShow" @close="isUpdateNameShow = false" :username="user.name" @updataUsername="user.name = $event"/>
    </van-popup>
    <van-popup v-if="isUpdateGenderShow" v-model="isUpdateGenderShow" position="bottom">
      <user-gender :gender="user.gender" @close="isUpdateGenderShow = false" @updateUserGender="user.gender = $event"/>
    </van-popup>
    <van-popup v-if="isUpdateBirthdayShow" v-model="isUpdateBirthdayShow" position="bottom">
      <user-birthday :birthday="user.birthday" @close="isUpdateBirthdayShow = false" @updateUserBirthday="user.birthday = $event"/>
    </van-popup>
    <van-popup v-if="isUpdateAvatarShow" v-model="isUpdateAvatarShow" position="bottom" style="height: 100%">
      <user-avatar :imgSrc="imgSrc" @close="isUpdateAvatarShow = false" @updateUserAvatar="user.photo = $event" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UserName from '@/views/user-profile/components/user-name'
import UserGender from '@/views/user-profile/components/user-gender'
import UserBirthday from '@/views/user-profile/components/user-birthday'
import UserAvatar from '@/views/user-profile/components/user-avatar'
export default {
  name: 'UserProfile',
  components: {
    UserName,
    UserGender,
    UserBirthday,
    UserAvatar
  },

  props: {},

  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdateAvatarShow: false,
      imgSrc: ''
    }
  },

  watch: {},

  computed: {},

  created() {
    this.loadUserProfile()
  },

  mounted() {},

  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast.fail('获取用户个人信息失败,请稍后再试!')
      }
    },
    onFileChange() {
      const file = this.$refs.file.files[0]
      this.imgSrc = window.URL.createObjectURL(file)
      this.isUpdateAvatarShow = true
      this.$refs.file.value = ''
    }
  }
}

</script>
<style lang='less' scoped>
.profile-container {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #F5F7F9;
  }
}
</style>
