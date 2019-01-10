/**
* User: vickyzhe@outlook.com
* Date: 2018/9/25
* Time: 下午4:11
*
*/
<template>
  <div class='padding10'>
    <div v-if="classListDatas.length !== 0" >
      <navigator class='item-wrap' v-for="classListData in classListDatas" :key="item" :url="'../classListDetail/main?course_id=' + classListData.course_id" >
        <div class='img-wrap'>
          <image mode='widthFix' :src=" _baseUrl + classListData.cover"></image>
        </div>
        <div class='weui-flex'>
          <div class='weui-flex__item padding10'>{{classListData.courseName}}</div>
          <div class='detail-btn padding10'>详情</div>
        </div>
      </navigator>
      <loadDataTips :isLoading="isLoading"/>
    </div>
    <noRecord :itemData="'暂无数据'" v-if="classListDatas.length === 0"/>
  </div>
</template>

<script>
  import noRecord from '@/components/noRecord'
  import loadDataTips from '@/components/loadDataTips'
  export default {
    name: 'index',
    components: { noRecord, loadDataTips },
    data () {
      return {
        classListDatas: [],
        page: 1,
        _baseUrl: this._baseUrl,
        kid: 0,
        hasData: false,
        isLoading: true,
      }
    },
    methods: {
      getData () {
        this.isLoading = true
        return new Promise(resolve => {
          this.$post({
            url: '/addons/course/course/list',
            data: {
              kid: this.kid,
              page: this.page
            }
          }).then(res => {
            const data = res.data.data
            this.classListDatas = this.classListDatas.concat(data)
            this.isLoading = false
            if (data.length === 10) {
              this.hasData = true
            }
          }).catch(res => {
            console.log(res)
          }).then(resolve)
        })
      }
    },
    onLoad (e) {
      this.classListDatas = []
      this.kid = e.kid
      this.getData()
    },
    onPullDownRefresh () {
      this.classListDatas = []
      this.page = 1
      this.getData().then(wx.stopPullDownRefresh)
    },
    onReachBottom () {
      if (this.hasData) {
        this.page += 1
        this.getData()
      }
    }
  }
</script>

<style scoped>
  .item-wrap {
    background-color: #ffffff;
    margin-bottom: 10px;
    box-shadow: 0 5rpx 5rpx #dfdfdf;
  }
  .img-wrap {
    height: 475rpx;
    overflow: hidden;
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

