<template>
    <el-card :body-style="{padding: '0px'}" class="product-container">
        <el-carousel trigger="click" :autoplay=false  height="200px">
            <el-carousel-item v-for="item in data.images" :key="item">
                <div style="display:flex; height: 100%; width: 100%;">
                    <img :src="item" class="card-image">
                </div>
            </el-carousel-item>
        </el-carousel>
        <div style="padding: 14px;">
            <div class="product-name">{{data.name}}</div>
            <div class="product-footer">
                <time class="time">{{ formatedDate }}</time>
                <el-button type="primary" size="mini" class="buy-button">Buy</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
import moment from 'moment'

export default {
  props: ['state', 'data'],
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    formatedDate: function () {
      return moment(this.data.created).format('DD/MM/YY')
    }
  },
  watch: {
    data: function (val) {
      console.log(val)
    }
  }
}
</script>

<style scope>
    img {
        width: 100%;
        object-fit: contain;
        margin: auto;
        display: block;
    }

    .buy-button {
        margin-left: auto;
    }

    .product-container {
        min-width: 200px;
        max-width: 400px;
        margin: 8px;
    }

    .product-title {
    }

    .product-footer {
        display: flex;
    }
</style>
