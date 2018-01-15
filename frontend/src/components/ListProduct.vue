<template>
    <el-card class="login-container">
        <el-form :model="formData" class="demo-form-inline" label-width="120px">
            <el-form-item>
                <p  class="logo">Add product</p>
            </el-form-item>
            <el-form-item label="Name">
                <el-input v-model="formData.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="Price">
                <el-input-number v-model="formData.price" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="Unit">
            <el-select v-model="formData.unit" placeholder="Unit">
                <el-option label="KG" value="KG"></el-option>
                <el-option label="Piece" value="Piece"></el-option>
                <el-option label="L" value="L"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="Quantity">
                <el-input-number v-model="formData.quantity" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="logIn">Submit</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import axios from 'axios'

export default {
  props: ['state'],
  mounted: function () {
    this.state.activeTab = '/add/product'
  },
  data () {
    return {
      formData: {

      }
    }
  },
  methods: {
    logIn () {
      axios.post(this.state.baseUrl + '/products', {
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
      height: 100%;
      width: 70%;
      margin-top: 10%;
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
