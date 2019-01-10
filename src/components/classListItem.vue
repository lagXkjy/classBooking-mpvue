/**
* User: vickyzhe@outlook.com
* Date: 2018/9/25
* Time: 下午4:05
*
*/
<template>
  <div class='padding10'>
    <block v-for="">
      <div class='title'>新手班</div>
      <div class='item-wrap' v-for="newHand in newHands" :key="item">
        <div class='img-wrap'>
          <image mode='aspectFill' :src='newHand.img'></image>
        </div>
        <div class='weui-flex'>
          <div class='weui-flex__item padding10'>{{newHand.name}}</div>
          <navigator url='../classListDetail/main' class='detail-btn padding10'>详情</navigator>
        </div>
      </div>
    </block>
  </div>
</template>

<script>
  export default {
    name: 'class-list-item',
    props: [itemData]
  }
</script>

<style scoped>
  .title {
    font-size: 14px;
    color: #b8860b;
    position: relative;
    padding: 0 15rpx 15rpx;
    height: 25px;
    line-height: 25px;
  }
  .title::before{
    content: '';
    border-left: 1px #b8860b solid;
    height: 18px;
    position: absolute;
    left: 0;
    top: 7rpx;
  }
  .item-wrap {
    background-color: #ffffff;
    margin-bottom: 10px;
    box-shadow: 0 5rpx 5rpx #dfdfdf;
  }
  .img-wrap {
    height: 243rpx;
  }
  .detail-btn {
    width: 168rpx;
    background-color: #ffd700;
    text-align: center;
  }
  .padding10{
    padding: 10px;
  }
</style>
