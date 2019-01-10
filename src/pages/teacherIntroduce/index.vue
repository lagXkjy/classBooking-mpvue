<template>
  <div>
    <navigator
      v-for='listData in listDatas'
      :key="item"
      :url="'./detail/main?id=' + listData.id"
      class="weui-media-box weui-media-box_appmsg wrap"
      hover-class="weui-cell_active"
    >
      <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
        <image class="weui-media-box__thumb" :src="_imgUrl +listData.cover" mode="aspectFill"/>
      </div>
      <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
        <div class="weui-media-box__title">{{listData.title}}</div>
        <div class="weui-media-box__desc"><wxParse :content="listData.content" /></div>
      </div>
    </navigator>
    <noRecord :itemData="tips" v-if="listDatas.length === 0"/>
  </div>
</template>

<script>
  import noRecord from '@/components/noRecord'
  import wxParse from 'mpvue-wxparse'
  export default {
    name: 'index',
    components: { noRecord, wxParse },
    data () {
      return {
        _imgUrl: '',
        listDatas: [],
        tips: '',
        page: 1,
        hasData: false,
        isLoading: true,
        kid: ''
      }
    },
    methods: {
      getData () {
        this.isLoading = true
        return new Promise(resolve => this.$post({
          url: 'addons/article/article/index',
          data: {
            kid: this.kid,
            page: this.page
          }
        }).then(res => {
          const data = res.data
          console.log(data)
          if (data.status === 0) {
            this.listDatas = this.listDatas.concat(data.data)
            if (data.data.length === 10) {
              this.hasData = true
            }
            this.isLoading = false
          } else if (data.status === 1) {
            this.tips = data.message
          }
        }).catch(error => {
          console.log(error)
        }).then(resolve))
      }
    },
    onLoad (e) {
      this.listDatas = []
      this.kid = e.kid
      this._imgUrl = this._baseUrl
      wx.setNavigationBarTitle({
        title: e.title
      })
      this.getData()
    },
    onPullDownRefresh () {
      this.page = 1
      this.listDatas = []
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
  .wrap {
    background-color: #ffffff;
  }
</style>
