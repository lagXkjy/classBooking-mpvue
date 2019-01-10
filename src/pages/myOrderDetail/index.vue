<template>
    <div>
      <div class='topImg'>
        <image src='../../static/imgs/banner.jpg' mode='aspectFill'></image>
      </div>

      <div class='wrap'>
        <div class='order-name padding10'>{{orderName}}</div>
        <div class='padding10'>
          <div>订单编号：{{orderId}}</div>
          <div>下单时间：{{orderTime}}</div>
        </div>
        <div class='padding10'>
          <div>支付方式：{{payWay}}</div>
          <div>支付时间：{{payTime}}</div>
        </div>
        <div class='padding10 weui-flex'>
          <div class='weui-flex__item'>课程总价</div>
          <div class='text-orange'>¥{{price}}</div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        orderName: '小学生街舞舞蹈课程',
        orderId: 'RITN39548390230R39',
        orderTime: '2017-06-12 09:22:21',
        payWay: '微信支付',
        payTime: '2017-06-12 09:22:25',
        price: '2016.00'
      }
    }
  }
</script>

<style scoped>
  .topImg {
    height: 230rpx;
  }
  .wrap {
    background-color: #ffffff;
  }
  .order-name {
    text-align: center;
    font-size: 14px;
  }
  .padding10 {
    padding: 20rpx;
    border-top: 1rpx #f2f2f2 solid;
  }
</style>
