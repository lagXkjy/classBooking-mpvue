<template>
  <div>
    <swiper indicator-dots="true" autoplay="true" interval="2000" circular="true" indicator-active-color="#FFFFFF" indicator-color="rgba(255,255,255,.3)" :style="{ height: itemHeight }">
      <swiper-item v-for='itemData in itemDatas' :key="item">
        <image :src="itemData.pic" mode='aspectFill'/>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'selfswiper',
    props: {
      itemDatas: Array,
      itemHeight: {
        type: String,
        default: '350rpx'
      }
    }
  }
</script>

<style scoped>

</style>
