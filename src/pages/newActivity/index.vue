<template>
  <div class="weui-panel weui-panel_access">
    <div class="weui-panel__bd">
      <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" v-for='listData in listDatas' :key="item">
        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
          <div class="weui-media-box__desc">{{listData.title}}</div>
          <div class="weui-media-box__info">
            <div class="weui-media-box__info__meta">{{listData.time}}</div>
          </div>
        </div>
        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
          <image class="weui-media-box__thumb" :src="listData.img" mode="aspectFill"/>
        </div>
      </navigator>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        listDatas: [{
          title: '第五届师资培训《中国街舞艺术教育考 级》 《1-3级综合基础》第五届师资培训《中国街舞艺术教育考 级》 《1-3级综合',
          img: '../../static/imgs/banner.jpg',
          time: '2018-08-28'
        }, {
          title: '第五届师资培训《中国街舞艺术教育考 级》 《1-3级综合基础》',
          img: '../../static/imgs/banner.jpg',
          time: '2018-08-28'
        }]
      }
    }
  }
</script>

<style scoped>
  .weui-media-box {
    padding: 10px;
  }
  .weui-media-box__desc {
    color: #000;
  }
  .weui-media-box__info__meta {
    font-size: 10px;
    color: #777777;
  }
  .weui-media-box::before {
    left: 10px;
    right: 10px;
  }
  .weui-media-box__hd_in-appmsg {
    width: 90px;
    height: 60px;
    margin-right: 0;
  }
</style>
