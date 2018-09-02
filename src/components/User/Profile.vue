<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-card-text>

            <p class="title text-xs-center my-4">Manager</p>
            <p class="text-xs-center mb-3">
              {{user.email}}
            </p>

            <v-btn dark large block color="primary my-4" @click="onLogout">
              LogOut
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      user () {
        let user = this.$store.getters.user
        if (user !== null && user !== undefined) {
          return user
        }
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/signin')
      }
    }
  }
</script>
