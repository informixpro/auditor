<template>

  <v-toolbar dark class="primary">
    <v-btn icon @click="goBack" v-if="!isRoot">
      <v-icon color="white">arrow_back</v-icon>
    </v-btn>
    <router-link to='/' style='cursor: pointer'>
      <svgicon name="logo" width="100" color="#ffffff"></svgicon>
    </router-link>
    <v-spacer></v-spacer>
    <router-link to="/profile" v-if="userIsAuthenticated">
      <v-btn icon>
        <v-icon medium>account_circle</v-icon>
      </v-btn>
    </router-link>
  </v-toolbar>

</template>

<script>
export default {
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    isRoot () {
      return this.$route.path === '/'
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>
