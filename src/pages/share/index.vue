/**
* User: vickyzhe@outlook.com
* Date: 2018/9/25
* Time: 下午11:37
*
*/
<template>
    <div class="wrap">
      <div class="title">好友付费立得600积分</div>
      <div class="canvas-wrap">
        <div class="box" >
          <canvas canvas-id="sharePic" style="height: 640px;width: 500px"/>
        </div>
      </div>
      <div class="canvas-img-wrap" style="height: 320px;width: 250px">
        <img class="canvas-img" :src="shareImgVal"/>
      </div>
      <div class="tips">您已成功邀请0位好友加入阅读 >></div>
      <div class="btn">立即邀请</div>
    </div>
</template>

<script >
  export default {
    name: 'index',
    data () {
      return {
        shareImgVal: "",//canvas画图后的最后分享图片
      }
    },
    methods: {
      // 画图片
      drawCanvas: function (ctx, src) {
        return new Promise((resovle, reject) => {
          ctx.drawImage(src, 0, 0, 500, 500)
          ctx.draw()
          ctx.drawImage('../../../static/imgs/banner.jpg', 380, 520, 100, 100)
          ctx.draw(true)
          // 生成图片
          ctx.font="bold 20px Arial"
          ctx.fillText(this.$store.state.userInfo.nickName, 20, 540)
          ctx.draw(true)
          ctx.font="normal 20px Arial"
          ctx.fillText('邀请你体验更好的生活', 20, 576)
          ctx.draw(true)
          ctx.fillText('长按识别二维码', 20, 608)
          ctx.draw(true)
          setTimeout(function () {
            resovle(ctx)
          }, 1000)
        })
      },
    },
    onLoad () {
      // // 获取分享的图片
      this.$post({
        url: 'addons/score/score/invite',
        data: {
          cauth_iden: 'jfldasjfewrqrew',
          uid: wx.getStorageSync('user_id'),
          handle: 'create',
          price: ''
        }
      }).then(res => {
        const imgVal = this._baseUrl + res.data.inviteImage
        console.log(imgVal)
        const ctx = wx.createCanvasContext("sharePic")
        this.drawCanvas(ctx, imgVal ).then(() => {
          //生成图片
          wx.canvasToTempFilePath({
            width: 500,
            height: 640,
            canvasId: 'sharePic',
            success: res => {
              this.shareImgVal = res.tempFilePath
              ctx.clearRect(0, 0, 640, 500)
            },
            fail: error => {
              console.log('失败生成图片',error)
            }
          })
        })
      })
    }
  }
</script>

<style scoped>
  .wrap {
    text-align: center;
    background: #ffffff;
    height: 100vh;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .box {
    zoom:0.5;
  }
  .canvas-wrap {
    height: 0;
    width: 0;
    overflow: hidden;
  }
  .title {
    font-size: 16px;
  }
  .canvas-img-wrap {
    margin: 20px auto;
    box-shadow: 0 0 5px #808080;
  }
  .tips {
    margin-bottom: 20px;
  }
  .btn {
    width: 300px;
    height: 36px;
    line-height: 36px;
    margin: 0 auto;
    background-color: rgb(219, 174, 12);
    border-radius: 50px;
    font-size: 16px;
  }
</style>
