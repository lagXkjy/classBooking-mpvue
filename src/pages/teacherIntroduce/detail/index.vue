<template>
    <div class="page">
      <div class="topImg">
        <image :src="_baseUrl + itemData.cover" mode='aspectFill'/>
      </div>
      <div class="page__bd">
        <div class="weui-article">
          <div class="weui-article__h1">{{itemData.title}}</div>
          <div class="weui-article__section">
            <div class="weui-article__section">
              <div class="weui-article__p">
                <wxParse :content="itemData.content"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import wxParse from 'mpvue-wxparse'
    export default {
        name: 'index',
        components: { wxParse },
        data() {
            return {
              itemData: {},
              id: '',
              _baseUrl: ''
            }
        },
        methods: {
          getData () {
            this.$post({
              url: 'addons/article/article/getarticle',
              data: {
                articleId: this.id,
              }
            }).then(res => {
              const data = res.data
              if (data.status ===0) {
                this.itemData = data.data
              }
            }).catch(error => {
              console.log(error)
            })
          }
        },
        onLoad (e) {
          this._baseUrl = this._baseUrl
          this.id = e.id
          this.getData()
        }
    }
</script>

<style scoped>
.page {
  background: #fff;
  min-height: 100vh;
}
.topImg {
  height: 475rpx;
}
</style>
