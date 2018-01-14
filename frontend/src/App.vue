<template>
  <div id="app">
    <app-header :state='state' appName='Food Shop'> </app-header>
    <img src="./assets/logo.png">
    <router-view :state='state'/>
  </div>
</template>

<script>
import Header from './components/AppHeader'

export default {
  props: ['state'],
  components: {
    'app-header': Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
