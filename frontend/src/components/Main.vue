<template>
  <el-card class="main-container">
    <el-input placeholder="Search" prefix-icon="el-icon-search" v-model="state.searchQuery" clearable>
    </el-input>
    <div class="product-flex-container wrap">
      <product v-if="products" v-for="product in products" :key="product.name" :data="product"></product>
    </div>
    <el-pagination
      @size-change="handleNumberOfItemsChange"
      @current-change="handlePageChange"
      :page-sizes="[10, 15, 20, 50]"
      :page-size=pageSize
      layout="total, sizes, prev, pager, next"
      :total=totalNumberOfProducts>
    </el-pagination>
  </el-card>
</template>

<script>
import Product from './Product'
import axios from 'axios'

export default {
  props: ['state'],

  mounted: function () {
    this.state.activeTab = '/'
    this.searchProducts()
  },
  methods: {
    searchProducts: function (query) {
      console.log('Searching products with q: ' + query)
      axios.get(this.state.baseUrl + '/products', {
        params: {
          q: query,
          from: this.pageNumber,
          size: this.pageSize
        }}).then(response => {
        this.products = response.data.hits
        this.totalNumberOfProducts = response.data.total
        console.log('Received ' + this.totalNumberOfProducts + ' hits')
      }).catch(e => {
        console.error(e)
      })
    },
    handleNumberOfItemsChange (val) {
      this.pageSize = val
      clearTimeout(this.searchTimeout)
      this.searchProducts(this.state.searchQuery)
    },
    handlePageChange (val) {
      this.pageNumber = val
      console.log(val)
      clearTimeout(this.searchTimeout)
      this.searchProducts(this.state.searchQuery)
    }
  },
  data () {
    return {
      products: [],
      searchTimeout: undefined,
      pageSize: 10,
      totalNumberOfProducts: 0,
      pageNumber: 1
    }
  },

  watch: {
    'state.searchQuery': function (newValue, oldValue) {
      console.log(newValue, oldValue)
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => this.searchProducts(newValue), 200)
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
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
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

.main-container {
  width: 70%;
  height: calc(100% - 8px);
  overflow-y: auto;
}
</style>
