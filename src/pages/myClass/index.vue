<template>
    <div>
      <div class='topImg'>
        <image :src='_baseUrl + course.cover' mode='aspectFill'></image>
      </div>

      <div class='class-info-wrap'>
        <div class='class-info'>
          <div>{{course.name}}</div>
          <div>课程结束时间:{{course_set.etime}}</div>
        </div>
        <div class='class-tips'>
          <div class='class-tips-title'>
            <div>上课时间&地点</div>
            <div></div>
          </div>
          <positionAndTime :itemDatas="course_set"/>
        </div>
      </div>
    </div>
</template>

<script>
  import positionAndTime from '@/components/positionAndTime'
  export default {
    name: 'index',
    components: { positionAndTime },
    data () {
      return {
        course_id: '',
        _baseUrl: this._baseUrl,
        course: {},
        course_set: {},
        teacher: {}
      }
    },
    methods: {
      getData () {
        this.$post({
          url: 'mine/mine/minehandle',
          data: {
            course_id: this.course_id,
            handle: 'detail'
          }
        }).then(res => {
          const { data } = res
          this.course = data.course
          this.course_set = data.course_set
          this.teacher = data.teacher
        }).catch(error => {
          console.log(error)
        })
      }
    },
    onLoad (e) {
      this.course_id = e.course_id
      this.getData()
    }
  }
</script>

<style scoped>
  .topImg {
    height: 115px;
  }
  .class-info-wrap {
    background-color: #ffffff;
  }
  .class-info {
    text-align: center;
    padding: 10px 0;
  }
  .class-tips {
    padding: 0 10px 15px;
  }
  .class-tips-title {
    border: 1px #cccccc solid;
    border-radius: 8px;
    background-color: #f5f5f5;
    padding: 15rpx;
    margin-bottom: 10px;
  }
</style>
