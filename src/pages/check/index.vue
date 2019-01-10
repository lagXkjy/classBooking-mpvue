<template>
    <div>
      <div class='top-wrap'>
        <image src='../../static/imgs/icon-bg.png' mode='aspectFill'></image>
        <div class='icon-sum'>
          <div class='icon-sum-num text-gold'>{{iconSum}}</div>
          <div>我的积分</div>
        </div>
      </div>

      <navigator class='text-c go-shop text-gold'>前往积分商城</navigator>

      <div class='block'>
        <div class='text-c'>今天已签到<text class='text-gold'>+1</text>！已连续签到<text class='text-gold'>1</text>天</div>

        <circleCheck :itemDay="checkedDay"/>

        <div class='btn-gold' @click="checkFn">签到</div>

        <div class='check-rules'>
          <div class='check-rules-title'>签到积分规则</div>
          <div>
            <div>1.签到当日获得积分实时累加，不清零；</div>
            <div>2.连续签到，获得积分加速，如中断签到则从5积分重新开始加速；</div>
            <div>3.签到获得的积分可以用来兑换商城里的礼品，礼品会定期更新，具体兑换规则以单个礼品介绍里详细规则为准</div>
            <div>4.签到时需要保持登录状态，领取的积分会绑定到登陆后的账号。</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import circleCheck from '@/components/circleCheck'
  import $ from '@/utils/function'
  export default {
    name: 'index',
    components: { circleCheck },
    data () {
      return {
        iconSum: 5,
        checkedDay: []
      }
    },
    onLoad () {
      this.getScore()
      this.getCheckFlags()
    },
    methods: {
      getScore () {
        this.$post({
          url: 'mine/mine/minehandle',
          data: {
            uid: wx.getStorageSync('user_id'),
            handle: 'score'
          }
        }).then(res => this.iconSum = res.data.total_score)
      },
      getCheckFlags () {
        this.$post({
          url: '/api/sign/signlist',
          data: {
            cauth_iden: 'jfldasjfewrqrew',
            uid: wx.getStorageSync('user_id'),
            token: wx.getStorageSync('token'),
          }
        }).then(res => this.checkedDay = $.jsonToArry(res.data.log))
      },
      checkFn() {
        this.$post({
          url: '/api/sign/sign',
          data: {
            cauth_iden: 'jfldasjfewrqrew',
            uid: wx.getStorageSync('user_id'),
            token: wx.getStorageSync('token'),
          }
        }).then(res => {
          const data = res.data
          if (data.status === 0) {
            wx.showToast({
              title: '签到成功',
              icon: 'success'
            })
            this.getScore()
            this.getCheckFlags()
          } else if (data.status === 1) {
            wx.showToast({
              title: data.message,
              icon: 'loading'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
  }
</script>

<style scoped>
  .top-wrap {
    height: 162px;
    position: relative;
  }
  .icon-sum {
    width: 110px;
    height: 110px;
    position: absolute;
    border-radius: 50%;
    text-align: center;
    top: 25px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: #ffffff;
    box-shadow: 0 0 15rpx #8a8a8a;
  }
  .icon-sum::after {
    content: '';
    height: 261rpx;
    width: 261rpx;
    position: absolute;
    top: -10px;
    left: -10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, .3)
  }
  .icon-sum-num {
    font-size: 24px;
    margin: 20px 0 0;
  }
  .go-shop {
    padding: 10px;
    background: #ffffff;
  }
  .btn-gold {
    margin: 10px auto 25px;
  }
  .check-rules {
    border: 1px #f5f5f5 solid;
    border-radius: 8px;
    padding: 25px 10px 10px;
    position: relative;
    color: #777777;
  }
  .check-rules-title {
    position: absolute;
    background: #ffffff;
    height: 25px;
    line-height: 25px;
    width: 125px;
    top: -10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    font-size: 14px;
    color: #000000;
  }
</style>
