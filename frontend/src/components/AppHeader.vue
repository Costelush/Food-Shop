<template>
    <div class="app-header">
        <h1 class="header-title">{{appName}}</h1>
    </div>
</template>

<script>
export default {
  props: ['state', 'appName'],
  mounted: function () {
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .app-header {
        height: 32px;
        width: 100%;
    }

    .header-title {
        color: #42b983;
        text-align: left;
    }
</style>
