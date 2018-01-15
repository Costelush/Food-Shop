<template>
<div></div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['state'],
  mounted: function () {
    this.state.activeTab = '/logout'
    this.logOut()
  },
  methods: {
    logOut () {
      axios.post(this.state.baseUrl + '/logout')
        .then((response) => {
          this.handleReponse(response)
        }).catch((error) => {
          console.log(error)
        })
    },
    handleReponse (response) {
      if (response.status === 200) {
        this.state.isLoggedIn = false
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>
