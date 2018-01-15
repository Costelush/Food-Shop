<template>
  <el-container id="app" style="width: 100%; height:100%;">
    <el-header style="display: flex; justify-content: center;">
      <el-menu :default-active="state.activeTab" class="app-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/" class="logo">Food Shop</el-menu-item>
      </el-menu>
      <el-menu :default-active="state.activeTab" class="login-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item v-if="!state.isLoggedIn" index="/login">Login</el-menu-item>
        <el-menu-item v-if="!state.isLoggedIn" index="/register">Register</el-menu-item>
        <el-menu-item v-if="state.isLoggedIn" index="/logout">Logout</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-main style="display: flex; justify-content: center;">
        <router-view :state='state'/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  props: ['state'],
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)

      switch (key) {
        case '/': this.$router.push({ path: '/' }); break
        case '/login': this.$router.push({ path: '/login' }); break
        case '/logout': this.$router.push({ path: '/logout' }); break
      }
    }
  }
}
</script>

<style>
html,
body {
    height: 100%;
    margin: 0px;
    padding: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo {
  font-weight: normal;
  font-style: oblique;
  font-variant: small-caps;
  color: #000000;
  letter-spacing: 1pt;
  word-spacing: 2pt;
  font-size: 23px;
  text-align: center;
  font-family: palatino linotype, palatino, serif;
  line-height: 0;
  margin-left: 8px;
  margin-right: 8px;
  padding: 0px;
}

.app-menu {
  width: 60%;
}

.login-menu {
  width: 10%;
}

</style>
