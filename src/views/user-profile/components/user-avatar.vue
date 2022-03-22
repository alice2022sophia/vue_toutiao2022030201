<template>
  <div class="user-avatar">
    <img :src="imgSrc" class="img" ref="img">
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserImg } from '@/api/user'
export default {
  name: 'UserAvatar',
  components: {},

  props: {
    imgSrc: {
      type: [String, Object],
      required: true
    }
  },

  data() {
    return {
      cropper: null
    }
  },

  watch: {},

  computed: {},

  created() {},

  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },

  methods: {
    onConfirm() {
      // console.log(this.cropper.getData()) pc端用此方法,且需要后端提供相应接口
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto(blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserImg(formData)
        this.$emit('updateUserAvatar', data.data.photo)
        this.$emit('close')
        this.$toast.success('更新用户头像成功!')
      } catch (err) {
        this.$toast.fail('更新用户头像失败!')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.user-avatar {
  height: 100%;
  background-color: #000;
  .img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 160px;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 30px;
    }
  }
}
</style>
