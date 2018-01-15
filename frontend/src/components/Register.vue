<template>
  <el-card class="register-container">
    <el-form :model="formData">
      <el-form-item>
          <p  class="logo">Register on Food Shop</p>
      </el-form-item>
      <el-form-item label="Name">
          <el-input v-model="formData.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="Email">
          <el-input v-model="formData.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="Password">
          <el-input v-model="formData.password" type="password" clearable></el-input>
      </el-form-item>
      <el-form-item label="Confirm password">
        <el-input v-model="formData.confirmPassword" type="password" clearable></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="register">Register</el-button>
      </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
import axios from 'axios'

export default {
  props: ['state'],
  mounted: function () {
    this.state.activeTab = '/register'
  },
  data () {
    return {
      formData: {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        created: Date.now()
      }
    }
  },
  methods: {
    register () {
      axios.post(this.state.baseUrl + '/users', this.formData)
        .then((response) => {
          this.handleReponse(response)
        }).catch((error) => {
          console.log(error)
        })
    },
    handleReponse (response) {
      if (response.status === 200) {
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<style scope>
    .register-container {
      height: 100%;
      width: 25%;
      margin-top: 16px;
      min-width: 300px;
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
