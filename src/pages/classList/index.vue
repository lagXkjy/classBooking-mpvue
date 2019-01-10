<template>
  <div class='padding10'>
    <div v-if="classListDatas.length !== 0">
      <navigator class='item-wrap' v-for="classListData in newClassListDatas" :key="item" :url="'../classListDetail/main?course_id=' + classListData.course_id" >
        <div class='img-wrap'>
          <image mode='widthFix' :src='_baseUrl + classListData.cover'></image>
        </div>
        <div class='weui-flex'>
          <div class='weui-flex__item padding10'>{{classListData.courseName}}</div>
          <div class='detail-btn padding10'>详情</div>
        </div>
      </navigator>
      <loadDataTips :isLoading="isLoading"/>
    </div>
    <noRecord :itemData="'暂无数据'" v-if="classListDatas.length === 0" />
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
        _baseUrl: this._baseUrl,
        page: 1,
        hasData: false,
        isLoading: true,
        classListDatas: []
      }
    },
    computed: {
      newClassListDatas: function(){
        return this.classListDatas.filter(v => v.status === '0')
      }
    },
    methods: {
      getData () {
        this.isLoading = true
        return new Promise (resolve => {
          this.$post({
            url: 'addons/course/course/courselist',
            data: {
              page: this.page
            }
          }).then(res => {
            const data  = res.data.data
            this.classListDatas = this.classListDatas.concat(data)
            this.isLoading = false
            if (data.length === 10) {
              this.hasData = true
            }
          }).catch(error => {
            console.log(error)
          }).then(resolve)
        })
      }
    },
    onLoad () {
      this.getData()
    },
    onPullDownRefresh () {
      this.page = 1
      this.classListDatas = []
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
    width: 168rpx;
    background-color: #ffd700;
    text-align: center;
  }
  .padding10{
    padding: 10px;
    font-size: 14px;
  }
</style>
