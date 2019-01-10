/**
* User: vickyzhe@outlook.com
* Date: 2018/9/27
* Time: 下午12:46
*
*/
<template>
    <div class="wrap">{{itemData}}</div>
</template>

<script>
  export default {
    name: 'no-record',
    props: ['itemData']
  }
</script>

<style scoped>
  .wrap {
    text-align: center;
    line-height: 30vh;
    color: #808080;
    font-size: 14px;
  }
</style>
