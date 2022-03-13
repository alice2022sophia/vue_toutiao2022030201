<template>
  <div class="my-container">
    <div v-if="user" class="header user-info">
      <div class="data-base">
        <div class="data-left">
          <van-image
            class="data-avatar"
            fit="cover"
            round
            :src="userInfo.photo"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="data-right">
          <van-button round size="mini" class="data-button">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="item-count">{{userInfo.art_count}}</span>
          <span class="item-text">头条</span>
        </div>
        <div class="data-item">
          <span class="item-count">{{userInfo.follow_count}}</span>
          <span class="item-text">关注</span>
        </div>
        <div class="data-item">
          <span class="item-count">{{userInfo.fans_count}}</span>
          <span class="item-text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="item-count">{{userInfo.like_count}}</span>
          <span class="item-text">获赞</span>
        </div>
      </div>
    </div>
    <div v-else class="header not-login">
      <div class="login-bar"  @click="goLogin">
        <img src="~@/assets/mobile.png" alt="">
        <span class="text">登录/注册</span>
      </div>
    </div>
      <van-grid clickable :column-num="2" class="grid-nav">
        <van-grid-item>
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item>
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text">历史</span>
        </van-grid-item>
      </van-grid>
      <van-cell class="notice" title="消息通知" is-link />
      <van-cell class="smart" title="小智同学" is-link />
      <van-cell v-if="user" class="logout" clickable title="退出登录" @click="goLogout" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}
    }
  },
  watch: {

  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    if (this.user) {
      this.getInfo()
    }
  },
  mounted() {

  },
  methods: {
    goLogin() {
      this.$router.push('/login')
    },
    goLogout() {
      this.$dialog.confirm({
        title: '确认退出登录吗?'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {

        })
    },
    async getInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(this.userInfo)
      } catch (err) {
        this.$toast('获取用户信息失败!')
      }
    }

  }
}
</script>
<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      color: #fff;
      font-size: 28px;
    }
  }
  .user-info {
    .data-base {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .data-left {
        display: flex;
        align-items: center;
        .data-avatar {
          width: 132px;
          height: 132px;
          margin-right: 20px;
          border: 4px solid #fff;
          box-sizing: border-box;
        }
        span {
          font-size: 30px;
          color: #fff;
        }
      }
      .data-right {
        .data-button {
          padding: 5px 16px;
        }
      }
    }
    .data-stats {
      display: flex;
      align-items: center;
      height: 130px;
      padding: 0 32px;
      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .item-count {
          font-size: 36px;
          margin-bottom: 5px;
        }
        .item-text {
          font-size: 23px;
        }
      }

    }
  }
  .grid-nav {
    .van-grid-item {
      height: 141px;
      i.toutiao {
        display: inline-block;
        font-size: 45px;
        color: #eb5253;
        margin-bottom: 8px;
      }
      :nth-child(2) i.toutiao {
        color: #ff9d1d;
      }
      span {
        font-size: 28px;
      }
    }
  }
    .notice {
      margin-top: 8px;
      height: 100px;
    }
    .smart {
      height: 100px;
    }
    .logout {
      height: 104px;
      margin-top: 8px;
      color: #d86262;
      font-size: 30px;
      .van-cell__title {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
}
</style>
