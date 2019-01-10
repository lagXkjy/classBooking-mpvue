<template>
    <div>
      <div class="topImg">
        <image :src="_baseUrl + course.cover" mode='widthFix'/>
      </div>
      <div class="weui-media-box weui-media-box_appmsg bg-white">
        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
          <div class="weui-media-box__title">{{ course.name }}</div>
          <!--<div class="weui-media-box__title price">¥ {{ course.price }}</div>-->
          <div class="weui-media-box__info">
            <div class="weui-media-box__info__meta remark">{{ course_set.remark }}</div>
          </div>
        </div>
        <div class='booking-btn' @click="bookingFn" :style="{ backgroundColor: btnState.color }">{{ btnState.text }}</div>
      </div>

      <div class='block'>
        <div class='title-gold'><span>课程简介</span></div>
        <wxParse :content="course.content" />
      </div>

      <div class='block'>
        <div class='title-gold'><span>上课时间&地点</span></div>
        <positionAndTime :itemDatas="course_set"/>
      </div>

      <div class='block'>
        <div class='title-gold'><span>授课老师</span></div>
        <div>{{ teacher.teacherName }}</div>
      </div>
    </div>
</template>

<script>
  import positionAndTime from '@/components/positionAndTime'
  import wxParse from 'mpvue-wxparse'
  export default {
    name: 'index',
    components: { positionAndTime, wxParse },
    data () {
      return {
        _baseUrl: this._baseUrl,
        course: {},
        course_set: {},
        teacher: {}
      }
    },
    computed: {
      btnState () {
        let newObj = {}
        if (this.course.start === 0) {
          newObj = {
            text: '报名',
            color: '',
            canUse: true
          }
        } else {
          newObj = {
            text: '即将开课',
            color: '#cdcdcd',
            canUse: false
          }
        }
        return newObj
      }
    },
    methods: {
      bookingFn () {
        const uid = wx.getStorageSync('user_id')
        if (!this.btnState.canUse) {
          return false
        }
        if (uid) {
          const that = this
          const class_time = JSON.parse(that.course.class_time)
          wx.showActionSheet({
            itemList: class_time.map(v => `${v[0]}课时/${v[1]}元`),
            success (res) {
              console.log(res.tapIndex)
              let price = 0
              switch (res.tapIndex) {
                case 0: price = class_time[0][1]
                      break
                case 1: price = class_time[1][1]
                      break
                case 2: price = class_time[2][1]
                      break
                case 3: price = class_time[3][1]
                      break
                default: break
              }
              that.payFn(price)
            },
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '请先登录',
            success: function () {
              wx.switchTab({
                url: '../mine/main'
              })
            }
          })
        }
      },
      payFn (price) {
        const that = this
        this.$post({
          url: 'api/pay/createorder',
          data: {
            uid: wx.getStorageSync('user_id'),
            course_id: this.course_set.course_id,
            price,
          }
        }).then(res => {
          const payInfo = res.data.pay
          const trade_sn = res.data.trade_sn
          wx.showModal({
            title: '提示',
            content: '确定报名该课程吗？',
            success: function (res) {
              if (res.confirm) {
                wx.requestPayment({
                  timeStamp: payInfo.timeStamp,
                  nonceStr: payInfo.nonceStr,
                  package: payInfo.package,
                  signType: 'MD5',
                  paySign: payInfo.paySign,
                  success: () => {
                    that.$post({
                      url: 'api/pay/paysuccess',
                      data: {
                        course_id: that.course_set.course_id,
                        uid: wx.getStorageSync('user_id'),
                        trade_sn,
                        price: that.course.price
                      }
                    }).then(res => {
                      wx.showToast({
                        title: res.data.message,
                        icon: 'success'
                      })
                    }).catch(error => {
                      wx.showToast({
                        title: '报名失败',
                        icon: 'success'
                      })
                    })
                  },
                  fail: (res) => {
                    console.log(res)
                  }
                })
              }
            }
          })
        })
      }
    },
    onLoad (e) {
      this.$post({
        url: '/addons/course/course/detail',
        data: {
          course_id: e.course_id
        }
      }).then(res => {
        const data = res.data.data
        this.course = data.course
        this.course_set = data.course_set
        this.teacher = data.teacher
      }).catch(res => {
        console.log(res)
      })
    }
  }
</script>

<style scoped>
  .topImg {
    height: 475rpx;
    overflow: hidden;
  }
  .weui-media-box {
    padding: 10px;
  }
  .weui-media-box__info__meta {
    color: #9b9b9b;
  }
  .remark {
    line-height: 17px;
  }
  .price {
    color: #b8860b;
  }
  .booking-btn {
    background-color: #ffd700;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50px;
  }
</style>
