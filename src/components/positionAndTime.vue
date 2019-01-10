<template>
  <div class='wrap'>
    <div class='position'>上课地点：{{itemDatas.address}}</div>
    <div class='time'>上课时间：{{itemDatas.stime}} - {{itemDatas.etime}}</div>
  </div>
</template>

<script>
  export default {
    name: 'positionAndTime',
    props: ['itemDatas'],
  }
</script>

<style scoped>
  .wrap {
    border: 1px #f2f2f2 solid;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  .time {
    padding: 15rpx;
  }
  .position {
    background-color: #f5f5f5;
    padding: 15rpx;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px #f2f2f2 solid;
  }
</style>
