<template>
  <div class='weui-flex__item' @click='toPage(itemUrl)'>
    <div class='nav-pic'><image :src='itemImg'></image></div>
    <div>{{itemText}}</div>
  </div>
</template>

<script>
  import functionObj from '@/utils/function'
  export default {
    name: 'mineNav',
    props: ['itemUrl', 'itemImg', 'itemText', 'canUse'],
    methods: {
      toPage(url) {
        functionObj.goPagewithLogin(this.canUse, url)
      }
    }

  }
</script>

<style scoped>
  .nav-pic{
    height: 35px;
    width: 35px;
    margin: 0 auto;
  }
</style>
