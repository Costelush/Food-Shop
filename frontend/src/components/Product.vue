<template>
    <el-card :body-style="{ padding: '0px' }">
        <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in data.images" :key="item">
                <img src="item" class="image">
            </el-carousel-item>
        </el-carousel>
        <div style="padding: 14px;">
            <span>{{data.name}}</span>
            <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">Operating button</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>

export default {
  props: ['state', 'data'],
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>

</style>
