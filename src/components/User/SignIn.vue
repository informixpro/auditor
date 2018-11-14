<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <app-alert @dismissed="onDismissed" :text="error.message" v-if="error"></app-alert>
        <v-card>
          <v-card-text>

            <p class="title text-xs-center my-4">Log In</p>
            <p class="mb-3 text-xs-center">
              No account?
              <router-link to="/signup">Create one now</router-link>
            </p>

            <form @submit.prevent="onSignIn">
              <v-text-field
                label="Email"
                v-model="email"
                type="email"
                required
                :rules="[() => email.length > 0 || 'This field is required']"
              ></v-text-field>

              <v-text-field
                label="Password"
                hint="Password must be greater than 6 characters"
                v-model="password"
                type="password"
                required
                :rules="[() => password.length > 0 || 'This field is required']"
              ></v-text-field>

              <v-btn type="submit" :disabled="loading" :loading="loading" dark large color="primary my-4" block>
                LogIn
                <span slot="loader" class="custom-loader">
                   <v-icon light>cached</v-icon>
                  </span>
              </v-btn>
            </form>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSignIn () {
      this.$store.commit('clearError')
      this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  }
}
</script>
