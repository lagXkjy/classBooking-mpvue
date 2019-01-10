/**
* User: vickyzhe@outlook.com
* Date: 2018/10/8
* Time: 上午11:10
*
*/
<template>
    <div class="wrap">
      <div v-if="isLoading">正在加载...</div>
      <div v-else>加载完成</div>
    </div>
</template>

<script>
  export default {
    name: 'load-data-tips',
    props: ['isLoading']
  }
</script>

<style scoped>
.wrap {
  text-align: center;
  color: #8a8a8a;
  margin: 30px auto;
}
</style>
