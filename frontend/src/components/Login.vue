<template>
    <el-card class="login-container">
        <el-form :model="loginData" class="demo-form-inline">
        <el-form-item>
            <p  class="logo">Food Shop</p>
        </el-form-item>
        <el-form-item>
            <el-input v-model="loginData.username" placeholder="Email" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="loginData.password" type="password" placeholder="Password" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="logIn">Login</el-button>
        </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import axios from 'axios'

export default {
  props: ['state'],
  mounted: function () {
    this.state.activeTab = '/login'
  },
  data () {
    return {
      loginData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    logIn () {
      axios.post(this.state.baseUrl + '/login', {
        username: this.loginData.username,
        password: this.loginData.password
      }).then((response) => {
        this.handleReponse(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    handleReponse (response) {
      if (response.status === 200) {
        this.state.isLoggedIn = true
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<style scope>
    .login-container {
      height: 50%;
      width: 25%;
      margin-top: 10%;
    }

    el-input {
        margin: 8px;
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
</style>
