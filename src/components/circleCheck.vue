/**
* User: vickyzhe@outlook.com
* Date: 2018/9/22
* Time: 上午10:38
*
*/
<template>
  <div class='weui-flex text-c'>
    <div class='weui-flex__item' v-for="(item, index) in checkDays" :key="item">
      <div :class="['icon-circular', {'icon-circular-active': item.value}]">
        +{{item.value}}
        <icon type='success' color='#b8860b' size='12' v-show="item.value"></icon>
      </div>
      <div>{{item.weekday}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'circleCheck',
    props: ['itemDay'],
    computed: {
      checkDays () {
        const aWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        const a = this.itemDay
        a.forEach((val, i) => {
          val.weekday = aWeek[i]
        })
        return a
      }
    },
  }
</script>

<style scoped>
  .weui-flex {
    margin-top: 10px;
  }
  .icon-circular {
    background: #f5f5f5;
    border: #cccccc 1px solid;
    color: #cccccc;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    line-height: 50px;
  }
  .icon-circular-active {
    background: #ffedd1;
    border-color: #b8860b;
    color: #b8860b;
    position: relative;
  }
  icon {
    position: absolute;
    top: 25px;
    right: -5rpx;
  }
</style>
