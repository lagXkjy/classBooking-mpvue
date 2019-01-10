<template>
  <div>
    <div class='wrap' v-for='listData in listDatas' :key="item">
      <div class='weui-flex'>
        <div class='weui-flex__item limit-row1'>{{listData.type}}</div>
        <div class='credit-num'>+ {{listData.score}}</div>
      </div>
      <div class='time'>{{listData.dates}}</div>
    </div>
    <noRecord :itemData="'暂无记录'" v-if="listDatas.length === 0"/>
  </div>
</template>

<script>
  import noRecord from '@/components/noRecord'
  export default {
    name: 'index',
    components: { noRecord },
    data () {
      return {
        listDatas: []
      }
    },
    methods: {
      getData () {
        this.$post({
          url: 'mine/mine/minehandle',
          data: {
            uid: wx.getStorageSync('user_id'),
            handle: 'scoreList'
          }
        })
          .then(res => this.listDatas = res.data)
          .catch(error => console.log(error))
      }
    },
    onLoad () {
      this.getData()
    },
  }
</script>

<style scoped>
  .wrap {
    background-color: #ffffff;
    padding: 10px;
    margin-top: 4px;
    font-size: 14px;
  }
  .credit-num {
    width: 100px;
    color: #ff7e00;
    text-align: right;
  }
  .time {
    color: #777777;
    font-size: 10px;
  }
</style>
