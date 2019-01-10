<template>
  <div>
    <navigator url="../myOrderDetail/main" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" v-for='listData in listDatas' :key="item">
      <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
        <div class="weui-media-box__title">{{listData.title}}</div>
        <div class="weui-media-box__info">
          <div class="weui-media-box__info__meta">{{listData.time}}</div>
        </div>
      </div>
      <div class="weui-media-box__hd">
        {{listData.num}}
      </div>
      <div class="weui-cell__ft weui-cell__ft_in-access"></div>
    </navigator>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        listDatas: [{
          title: '第五届师资培训《中国街舞艺术教育考 级》 《1-3级综合基础》第五届师资培训《中国街舞艺术教育考 级》 《1-3级综合',
          num: '+1',
          time: '2018-08-28'
        }, {
          title: '第五届师资培训《中国街舞艺术教育考 级》 《1-3级综合基础》',
          num: '+600',
          time: '2018-08-28'
        }]
      }
    }
  }
</script>

<style scoped>
  .weui-media-box {
    padding: 20rpx;
    margin-top: 8rpx;
    background-color: #ffffff;
    font-size: 14px;
  }
  .weui-media-box::before{
    border: 0;
  }
  .weui-media-box__hd {
    color: #ff7e00;
    text-align: right;
    width: 100rpx;
  }
  .weui-media-box__info__meta {
    color: #777777;
    font-size: 10px;
  }
</style>
