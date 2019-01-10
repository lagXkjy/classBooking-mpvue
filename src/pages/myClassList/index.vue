/**
* User: vickyzhe@outlook.com
* Date: 2018/9/27
* Time: 下午1:38
*
*/
<template>
  <div class='padding10'>
    <div class='item-wrap' v-for="classListData in classListDatas" :key="item">
      <div class='img-wrap'>
        <image mode='aspectFill' :src=" _baseUrl + classListData.cover"></image>
      </div>
      <div class='weui-flex'>
        <div class='weui-flex__item padding10'>{{classListData.name}}</div>
        <navigator :url="'../myClass/main?course_id=' + classListData.course_id" class='detail-btn padding10'>详情</navigator>
      </div>
    </div>
    <noRecord :itemData="tips" v-if="classListDatas.length === 0"/>
  </div>
</template>

<script>
  import noRecord from '@/components/noRecord'
  export default {
    name: 'index',
    components: { noRecord },
    data () {
      return {
        classListDatas: [],
        _baseUrl: this._baseUrl,
        tips: ''
      }
    },
    methods: {
      getData () {
        return new Promise(resolve => this.$post({
          url: 'mine/mine/minehandle',
          data: {
            uid: wx.getStorageSync('user_id'),
            handle: 'course'
          }
        }).then(res => {
          const data = res.data
          if (data.code === 1) {
            this.tips = data.message
          } else {
            this.classListDatas = data
          }
        }).catch(res => {
          console.log(res)
        }).then(resolve)
        )
      }
    },
    onLoad () {
      this.getData()
    },
    onPullDownRefresh () {
      this.classListDatas = []
      this.getData().then(wx.stopPullDownRefresh)
    },
  }
</script>

<style scoped>
  .item-wrap {
    background-color: #ffffff;
    margin-bottom: 10px;
    box-shadow: 0 5rpx 5rpx #dfdfdf;
  }
  .img-wrap {
    height: 243rpx;
  }
  .detail-btn {
    width: 84px;
    background-color: #ffd700;
    text-align: center;
  }
  .padding10{
    padding: 10px;
  }
</style>
