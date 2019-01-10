<template>
  <div>
    <selfswiper :itemDatas="swpierPics" :itemHeight="'400rpx'"/>

    <!--横向导航-->
    <scroll-view class='index-nav block' scroll-x>
      <navigator class='index-nav-item' :url="'../teacherIntroduce/main?kid=' + bNavData.kid +'&title=' + bNavData.kinds " hover-class='none' v-for="bNavData in bNavDatas" :key="bNavData.kid">
        <div class='index-nav-pic'>
          <image :src='_imgUrl + bNavData.image' v-if="bNavData.image !== '0'"></image>
        </div>
        <div>{{ bNavData.kinds }}</div>
      </navigator>
    </scroll-view>
    <!--纵向导航-->
    <div class='index-s-nav block' v-for="sNavData in sNavDatas" :key="sNavData.kid">
      <div class='title-gold'><span>{{ sNavData.kinds }}</span></div>
      <div class="index-s-nav-inner">
        <navigator class="index-s-nav-item" :url="'../indexClassList/main?kid=' + child.kid" hover-class='activity-hover' v-for="(child, i) in sNavData.kids" :key="child.kid">
          <image mode="aspectFill" :src='_imgUrl + sNavData.image' v-if="sNavData.image !== '0'"></image>
          <div class='index-activity-title'>{{ child.kinds }}</div>
        </navigator>
      </div>
    </div>
  </div>
</template>

<script>
  import selfswiper from '@/components/selfswiper'
  export default {
    name: 'index',
    components: { selfswiper },
    data () {
      return {
        _imgUrl: '',
        swpierPics: [{ pic: '../../static/imgs/banner.jpg', url: '' }, { pic: '../../static/imgs/banner.jpg', url: '' }],
        bNavDatas: [],// 中间导航栏
        sNavDatas: [] // 下面导航块
      }
    },
    methods: {
      getKinds () {
        return new Promise((resolve, reject) => {
          this.$post({
            url: '/addons/kinds/kinds/getkinds',
            data: {}
          }).then(res => {
            const data = res.data.data
            console.log(data)
            data.forEach(val => {
              if (val.parent_id) {
                data.forEach(valInner => {
                  if (valInner.kid == val.parent_id) {
                    const newArray = valInner.kids || []
                    newArray.push(val)
                    valInner.kids = newArray
                  }
                })
              }
            })
            const bNav = data.filter(val => {
              return !val.kids && val.parent === 0
            })
            const sNav = data.filter(val => {
              return val.kids
            })
            this.bNavDatas = bNav
            this.sNavDatas = sNav
          }).catch(res => {
            console.log(res)
          }).then(resolve)
        })
      }
    },
    created () {
      this._imgUrl = this._baseUrl
      this.getKinds()
    },
    onPullDownRefresh () {
      this.getKinds().then(wx.stopPullDownRefresh)
    }
  }
</script>

<style scoped>
  .index-nav{
    width: 100vw;
    padding: 10px 10px 5px;
    box-sizing: border-box;
    font-size: 10px;
    white-space: nowrap;
  }
  .index-nav-item {
    display: inline-block;
    text-align: center;
    margin: 0 20px;
    position: relative;
  }
  .index-nav-pic{
    width: 40px;
    height: 40px;
    margin: 0 auto 5px;
    background-color: #eeeeee;
    position: relative;
  }
  .index-nav-pic::after{
    content: '';
    border-left: 1px #eeeeee solid;
    position: absolute;
    right: -20px;
    height: 30px;
    top: 5px;
  }

  .index-s-nav{
    padding: 15px 10px 15px 5px;
  }
  .index-s-nav-inner {
    overflow: hidden;
  }
  .index-s-nav-item {
    margin: 0 0 5px 5px;
    width: calc((100vw - 50rpx) / 2);
    height: 110px;
    float: left;
    text-align: center;
    position: relative;
  }
  .index-activity-title{
    width: 100%;
    line-height: 110px;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    color: #FFF;
    font-size: 16px;
    background-color: rgba(0, 0, 0, .8);
    font-family: "华文细黑";
  }
</style>
