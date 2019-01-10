<template>
  <div>
    <div class='wrap' v-for='listData in listDatas' :key="item">
      <div class='img'>
        <image :src='listData.img'></image>
      </div>
      <div class='title'>{{listData.title}}</div>
      <div class="weui-flex">
        <div class="weui-flex__item price">¥{{listData.price}}</div>
        <div class='booking-btn'>立即预约</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        listDatas: [{
          title: '夏日清凉又火辣，女孩子就要把自己push一把！',
          price: '12323',
          img: ''
        },
        {
          title: '夏日清凉又火辣，女孩子就要把自己push一把！',
          price: '12323',
          img: ''
        }]
      }
    }
  }
</script>

<style scoped>
  page {
    background-color: #ffffff;
  }
  .wrap {
    width: 95vw;
    margin: 0 auto;
    padding: 10px 0;
    background-color: #ffffff;
    border-bottom: 1px #eeeeee solid;
  }
  .img {
    height: 340rpx;
    background-color: #d1c0a5;
  }
  .title {
    margin: 5px 0;
  }
  .booking-btn {
    background-color: #b8860b;
    color: #FFF;
    border-radius: 25px;
    padding: 0 15px;
  }
</style>
