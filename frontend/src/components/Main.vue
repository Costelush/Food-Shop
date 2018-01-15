<template>
  <div>
    <h2>{{ state.baseUrl }}</h2>
    <div class="product-flex-container wrap">
      <product v-if="products" v-for="product in products" :key="product.name" :data="product"></product>
    </div>
  </div>
</template>

<script>
import Product from './Product'
import axios from 'axios'

export default {
  props: ['state'],

  mounted: function () {
    this.searchItems()
  },
  methods: {
    searchItems: function (query) {
      axios.get(this.state.baseUrl + '/products')
        .then(response => {
          // JSON responses are automatically parsed.
          this.products = response.data.hits
          console.log('Received ' + this.products.length + ' hits')
        })
        .catch(e => {
          console.error(e)
        })
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      products: []
    }
  },
  components: {
    'product': Product
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-flex-container {
  padding: 0;
  margin: 0;
  list-style: none;
  border: 1px solid silver;
  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
}

.wrap {
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
</style>
