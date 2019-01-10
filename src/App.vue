<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorage({ key: 'code', data: res.code })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('APP获取用户信息:', res)
        if (res.authSetting['scope.userInfo']) {
          console.log('已经授权')
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('成功', res)
              // 可以将 res 发送给后台解码出 unionId
              this.$store.state.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              console.log('this.$store.state.userInfoReadyCallback', this.$store.state.userInfoReadyCallback)
              if (this.$store.state.userInfoReadyCallback) {
                this.$store.state.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('无授权')
        }
      }
    })
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
page{
  font-size: 12px;
  background-color: #f5f5f5;
}
image {
  width: 100%;
  height: 100%;
}
button::after{
  border: none;
}
.block{
  margin-top: 12rpx;
  background: #ffffff;
  padding: 20rpx;
}
.text-grey{
  color: #aaa;
}
.text-green{
  color:#059c4f;
}
.text-white{
  color: #fff;
}
.text-orange{
  color: #ff7e00;
}
.text-gold{
  color: #b8860b;
}
.text-r{
  text-align: right;
}
.text-c{
  text-align: center;
}
.bg-white {
  background-color: #ffffff
}
.bg-red{
  background-color: #f35951;
  color: #fff;
}
.bg-green{
  background-color:#059c4f;
  color: #fff;
}
.bg-orange{
  background-color: #ef7d24;
  color: #fff;
}
.top{
  top: 0;
}
.bottom{
  bottom: 0;
}
.float-L {
  float: left;
}
.float-R {
  float: right;
}
.limit-row1{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.limit-row2{
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.page__hd {
  padding: 40px;
}
.page__bd {
  padding-bottom: 40px;
}
.page__bd_spacing {
  padding-left: 15px;
  padding-right: 15px;
}

.page__ft{
  padding-bottom: 10px;
  text-align: center;
}

.page__title {
  text-align: left;
  font-size: 20px;
  font-weight: 400;
}

.page__desc {
  margin-top: 5px;
  color: #888888;
  text-align: left;
  font-size: 14px;
}

.prodM-wrap{
  background-color: #f5f5f5;
  overflow: hidden;
  padding:  0 0 20rpx 2%;
}
.prodM{
  float: left;
  width: 48%;
  margin: 20rpx 2% 0 0;
}

/*  */
.title-gold {
  text-align: center;
  font-size: 14px;
  color: #b8860b;
  margin-bottom: 20rpx;
}
.title-gold span {
  display: inline-block;
  position: relative;
}
.title-gold span::before{
  left: -40rpx;
}
.title-gold span::after{
  right: -40rpx;
}
.title-gold span::before, .title-gold span::after{
  content: '';
  position: absolute;
  border-bottom: 1rpx #b8860b solid;
  width: 30rpx;
  bottom: 45%;
}
/*  */
.btn-gold {
  height: 60rpx;
  width: 190rpx;
  line-height: 60rpx;
  background: #b8860b;
  color: #ffffff;
  border-radius: 50rpx;
  text-align: center;
}
  .wxParse image {
    width: 100% !important;
  }
</style>
