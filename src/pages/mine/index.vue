<template>
  <div class='page'>
    <div class='handle-wrap'>

      <div class="userinfo" v-if="hasUserInfo" >
        <image class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover"></image>
        <div class='userInfo-nickName'>{{userInfo.nickName}}</div>
      </div>
      <div class="userinfo" v-else>
        <button open-type="getUserInfo" class='login-btn' v-if="authSettingUserInfo" @getuserinfo="bindGetUserInfo">登录</button>
        <button open-type="openSetting" class='login-btn' v-else @opensetting="bindOpenSetting">授权登录</button>
      </div>

      <div class='tips' @click="goPage">
        <div class='float-L'>邀请好友加入</div>
        <div class='float-R'>有机会得600积分</div>
      </div>

      <div class='weui-cell mine-order-info mine-order-info-first'>
        <mineNav :itemUrl="'../myClassList/main'" :itemImg="'../../static/imgs/mine-class.png'" :itemText="'课程'" :canUse="hasUserInfo"/>
        <mineNav :itemUrl="'../credit/main'" :itemImg="'../../static/imgs/mine-icon.png'" :itemText="'积分'" :canUse="hasUserInfo"/>
        <mineNav :itemUrl="'../myOrder/main'" :itemImg="'../../static/imgs/mine-order.png'" :itemText="'订单'" :canUse="hasUserInfo"/>
      </div>
      <div class='weui-cell mine-order-info'>
        <mineNav :itemUrl="'../myClass/main'" :itemImg="'../../static/imgs/mine-search.png'" :itemText="'课时查询'" :canUse="hasUserInfo"/>
        <mineNav :itemUrl="'../check/main'" :itemImg="'../../static/imgs/mine-check.png'" :itemText="'签到'" :canUse="hasUserInfo"/>
        <mineNav :itemUrl="'../myClass/main'" :itemImg="'../../static/imgs/mine-shop.png'" :itemText="'积分商城'" :canUse="hasUserInfo"/>
      </div>
    </div>
  </div>
</template>

<script>
  import mineNav from '@/components/mineNav'
  import $ from '@/utils/function'
  export default {
    name: 'index',
    data () {
      return {
        authSettingUserInfo: true, // 用户授权获取信息
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      }
    },
    components: { mineNav },
    methods: {
      bindGetUserInfo (e) {
        if (wx.getStorageSync('code')) {
          const detail = e.mp.detail
          if (detail.userInfo) {
            const data = {
              code: wx.getStorageSync('code'),
              iv: detail.iv,
              rawData: detail.rawData,
              signature: detail.signature,
              encryptedData: detail.encryptedData,
              cauth_iden: 'jfldasjfewrqrew'
            }
            this.requireLogin(data, detail.userInfo)
          } else {
            this.authSettingUserInfo = false
          }
        } else {
          this.login()
        }
      },
      bindOpenSetting (e) {
        if (e.mp.detail.authSetting['scope.userInfo']) {
          this.login()
        } else {
          wx.showModal({
            title: '授权提示',
            content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
          })
        }
      },
      getUserInfo (code) {
        wx.getUserInfo({
          success: res => {
            const data = {
              code: code || wx.getStorageSync('code'),
              iv: res.iv,
              rawData: res.rawData,
              signature: res.signature,
              encryptedData: res.encryptedData,
              cauth_iden: 'jfldasjfewrqrew'
            }
            this.requireLogin(data, res.userInfo)
          }
        })
      },
      login () {
        wx.login({
          success: res => {
            var code = res.code
            this.getUserInfo(code)
          }
        })
      },
      requireLogin (data, userInfo) {
        this.$post({
          url: 'api/login/minilogin',
          data
        }).then(res => {
          const data = res.data.data
          console.log('登录成功', data)
          wx.setStorage({ key: 'openId', data: data.openId })
          wx.setStorage({ key: 'token', data: data.token })
          wx.setStorage({ key: 'unionId', data: data.unionId })
          wx.setStorage({ key: 'user_id', data: data.user_id })
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
          this.$store.state.userInfo = userInfo
          this.userInfo = userInfo
          this.hasUserInfo = true
        }).catch(error => {
          wx.showToast({
            title: '登录失败',
            icon: 'loading'
          })
          console.log('登录失败', error)
        })
      },
      goPage () {
        $.goPagewithLogin(this.hasUserInfo, '../share/main')
      }
    },
    created () {
      if (this.$store.state.userInfo) {
        this.userInfo = this.$store.state.userInfo
        this.hasUserInfo = true
      } else if (this.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        this.$store.state.userInfoReadyCallback = res => {
          this.userInfo = res.userInfo
          this.hasUserInfo = true
        }
      }
    },
    onShow () {
      if (!wx.getStorageSync('user_id')) {
        this.userInfo = {}
        this.hasUserInfo = false
      }
    }
  }
</script>

<style scoped>
.page{
  padding-top: 40px;
  position: relative;
}
.handle-wrap {
  background-color: #FFF;
  border-radius: 10px;
  width: 95vw;
  margin: 0 auto;
  position: relative;
  padding-top: 40px;
}
.userinfo {
  text-align: center;
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
}
.userinfo button{
  background-color: #FFF;
  box-shadow: 0 0 5rpx #cdcdcd;
  width: 100px;
  font-size: 14px;
  border-radius: 50px;
}
.userinfo-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px #FFF solid;
}
.userInfo-nickName {
  height: 10px;
  line-height: 10px;
}
.tips {
  background-color: #eeeeee;
  width: 90%;
  margin: 10px auto;
  border-radius: 50px;
  overflow: hidden;
  padding: 10px 15px;
  box-shadow: 0 1px 1px #cdcdcd;
  font-size: 16px;
}
.weui-cell::before {
  border-color: #eeeeee;
}
.mine-order-info-first::before {
  left: 0;
  right: 0;
}
.mine-order-info{
  text-align: center;
}
</style>
